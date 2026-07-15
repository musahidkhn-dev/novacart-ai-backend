import Coupon from "../models/couponModel.js";

export const createCoupon = (data) => {
    return Coupon.create(data);
}

export const findCouponById = (id) => {
    return Coupon.findById(id);
}

export const findCouponByCode = (code) => {
    return Coupon.findOne({
        code: code.toUpperCase(),
    });
}

export const findAllCoupons = () => {
    return Coupon.find().sort({
        createAt: -1,
    });
}

export const saveCoupon = (coupon) => {
    return coupon.save();
}

export const deleteCoupon = (id) => {
    return Coupon.findByIdAndDelete(id);
}

export const findActiveCouponByCode =  (code) => {

   return  Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
   });
}