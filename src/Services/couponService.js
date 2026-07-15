import { COUPON_TYPE } from "../constants/couponType.js";
import { findCartByUser, saveCart } from "../repositories/cartRepository.js";
import { createCoupon, deleteCoupon, findActiveCouponByCode, findAllCoupons, findCouponByCode, findCouponById, saveCoupon } from "../repositories/couponRepository.js";
import { countCouponUsage, findCouponUsage } from "../repositories/couponUsageRepository.js";
import ApiError from "../utils/apiError.js";


export const createCouponService = async(data) => {

    const existingCoupon = await findCouponByCode(data.code);

    if(existingCoupon) {
        throw new ApiError(400, "Coupon already exists.");
    }

    if(data.startsAt >= data.expiresAT) {
        throw new ApiError(400, "Expiry date must be after start date.");
    }

    if(data.type === COUPON_TYPE.PERCENTAGE && data.value > 100) {
        throw new ApiError(400, "Percentage discount cannot exceed 100.");
    }

    return await createCoupon(data);
}

export const getAllCouponsService = async() => {
    return await findAllCoupons();
}

export const getCouponByIdService = async(couponId) => {
    
    const coupon = await findCouponById(couponId);

    if(!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    return coupon;
}

export const updateCouponService = async(couponId, data) => {

    const coupon = await findCouponById(couponId);

    if(!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    if(data.startsAt && data.expiresAt && data.startsAt >= data.expiresAt) {
        throw new ApiError(400, "Expiry date must be after start date.");
    }

    if(data.type === COUPON_TYPE.PERCENTAGE && data.value > 100) {
        throw new ApiError(400, "Percentage discount cannot exceed 100.");
    }

    Object.assign(coupon,data);

    return await saveCoupon(coupon);
}

export const deleteCouponService = async(couponId) => {

    const coupon = await findCouponById(couponId);

    if(!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    await deleteCoupon(couponId);

    return true;
}

export const applyCouponService = async(userId,data) => {

    const cart = await findCartByUser(userId);

    if(!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty.");
    }
    
    const coupon = await findActiveCouponByCode(data.code);

    if(!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    const now = new Date();

    if(coupon.startsAt > now) {
        throw new ApiError(400, "Coupon is not active yet.");
    }

    if(coupon.expiresAt < now) {
        throw new ApiError(400, "Coupon has expired.");
    }

    const totalUsage = await countCouponUsage(coupon._id);

    if(coupon.usageLimit > 0 && totalUsage >= coupon.usageLimit) {
        throw new ApiError(400, "Coupon usage limit exceeded.");
    }

    const alreadyUsed = await findCouponUsage(coupon._id, userId);

    if(alreadyUsed) {
        throw new ApiError(400, "You have already used this coupon.");
    }

    const subtotal = cart.items.reduce((sum,item) => sum + item.quantity * item.priceAtAddTime, 0);

    if(subtotal < coupon.minimumOrderAmount) {
        throw new ApiError(400, `Minimum order amount is ₹${coupon.minimumOrderAmount}.`);
    }

    let discount = 0;

    if(coupon.type === COUPON_TYPE.PERCENTAGE) {
        discount = (subtotal * coupon.value) / 100;

        if(coupon.maximumDiscount > 0) {
            discount = Math.min(
                discount,
                subtotal
            );
        }
    }else{
        discount = coupon.value;
    }

    cart.discount = discount;
    cart.appliedCoupon = coupon._id;

    await saveCart(cart);

    return {
        couponCode: coupon.code,
        subtotal,
        discount,
        grandTotal: subtotal - discount,
        cart,
    };
}

export const removeCouponService = async(userId) => {

    const cart = await findCartByUser(userId);

    if(!cart) {
        throw new ApiError(404, "Cart not found.");
    }

    if(!cart.appliedCoupon) {
        throw new ApiError(400, "No coupon applied.");
    }

    cart.appliedCoupon = null;
    cart.discount = 0;

    await saveCart(cart);

    return cart;
}

export const recalculateCouponService = async(cart) => {
console.log("===== Recalculate Coupon Called =====");
    if(!cart.appliedCoupon) {
        return cart;
    }

    const coupon = await findCouponById(cart.appliedCoupon);

    if(!coupon || !coupon.isActive) {
        cart.appliedCoupon = null;
        cart.discount = 0;

        await saveCart(cart);

        return cart;
    }

    const now = new Date();

    if(coupon.startsAt > now || coupon.expiresAt < now) {
        cart.appliedCoupon = null;
        cart.discount = 0;

        await saveCart(cart);

        return cart;
    }

    const subtotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.priceAtAddTime,0
    );
console.log("Subtotal:", subtotal);
console.log("Minimum Order:", coupon.minimumOrderAmount);
console.log("Condition:", subtotal < coupon.minimumOrderAmount);
    if(subtotal < coupon.minimumOrderAmount) {
        cart.appliedCoupon = null;
        cart.discount = 0;
console.log("Removing coupon...");
        await saveCart(cart);

        return cart;
    }

    let discount =0;
    if(coupon.type === COUPON_TYPE.PERCENTAGE) {
        discount = (subtotal * coupon.value) / 100;

        if(coupon.maximumDiscount > 0) {
            discount = Math.min(
                discount,
                coupon.maximumDiscount
            );
        }
    }else {
        discount = Math.min(
            coupon.value,
            subtotal
        );
    }

    cart.discount = discount,
    await saveCart(cart);
    return cart;
}