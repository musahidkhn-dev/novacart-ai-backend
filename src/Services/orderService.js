import mongoose from "mongoose";
import { findAddressById } from "../repositories/addressRepository.js";
import { findCartByUser, saveCart } from "../repositories/cartRepository.js";
import { createOrder, findAllOrders, findOrderById, findOrderByUser, saveOrder } from "../repositories/orderRepository.js";
import { findVariantById, saveVariant } from "../repositories/variantRepository.js";
import ApiError from "../utils/apiError.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";


export const createOrderService = async(userId, data) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        //Cart
        const cart = await findCartByUser(userId);

        if(!cart || cart.items.length === 0) {
            throw new ApiError(400, "Cart is empty");
        }

        //Address
        const address = await findAddressById(data.addressId);

        if(!address) {
            throw new ApiError(404, "Address not found.");
        }

        if(address.user.toString() !== userId.toString()) {
            throw new ApiError(403,"Unauthorized.");
        }   


        //Build Order
        const orderItems = [];
        let subtotal = 0
        
        for(const item of cart.items) {
            const variant = await findVariantById(item.variant);

            if(!variant)  {
                throw new ApiError(404, "Variant not found.");
            }

            if(!variant.isActive) {
                throw new ApiError(400, "Variant in inactive.");
            }

            if(variant.stock < item.quantity) {
                throw new ApiError(400, "Insufficient stock.")
            }

            const primaryImage = variant.images.find(img => img.isPrimary);
         
            orderItems.push({
                product: variant.product._id,
                variant: variant._id,
                productName: variant.product.name,
                sku: variant.sku,
                image: primaryImage ? primaryImage.url : "",
                price: variant.price,
                quantity: item.quantity,
            });
           
           

            subtotal += variant.price * item.quantity;

        }

        // TOTALS

        const shippingCharge = 0;
        const tax = 0;
        const discount = 0;
        const grandTotal = subtotal + shippingCharge + tax - discount;


        // ORDER NUMBER

        const orderNumber = `NC${Date.now()}`;

        // CREATE ORDER 
        
        const [order] = await createOrder([{
            user: userId,
            orderNumber,
            orderItems,
            shippingAddress: {
                fullName: address.fullName,
                phone: address.phone,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                landmark: address.landmark,
                city: address.city,
                state: address.state,
                country: address.country,
                postalCode: address.postalCode,
            },
            subtotal,
            discount: cart.discount,
            grandTotal: subtotal - cart.discount,
            coupon: cart.appliedCoupon,
            shippingCharge,
            tax,
            discount,
            paymentMethod: data.paymentMethod,
        }], session);

        // DEDUCT STOCK

        for(const item of cart.items) {
            const variant = await findVariantById(item.variant);
            variant.stock -= item.quantity;

            await saveVariant(variant,session)
        }

        //CLEAR CART 
        cart.items = [];

        await saveCart(cart,session);

        //COMMIT

        await session.commitTransaction();
        session.endSession();
        return order;


    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

export const getMyOrdersService = async(userId) => {
    return await findOrderByUser(userId);
}

export const getMyOrderService = async(userId,orderId) => {
    const order = await findOrderById(orderId);

    if(!order) {
        throw new ApiError(404, "Order not found.");
    }

    if(order.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }

    return await order;
}

export const cancelOrderService = async(userId,orderId) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const order = await findOrderById(orderId);
        
        if(!order) {
            throw new ApiError(404, "Order not found.");
        }

        if(order.user.toString() !==  userId.toString()) {
            throw new ApiError(403, "Unauthorized.");
        }

        if(![ORDER_STATUS.PENDING,ORDER_STATUS.CONFIRMED].includes(order.orderStatus)) {
            throw new ApiError(400, "This order cannot be cancelled.");
        }

        for(const item of order.orderItems) {

            const variant = await findVariantById(item.variant);

            if(variant) {
                variant.stock += item.quantity;
                
                await saveVariant(
                    variant,
                );
            }
        }

        order.orderStatus = ORDER_STATUS.CANCELLED;

        await saveOrder(order,session);

        await session.commitTransaction();

        session.endSession();

        return order;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const getAllOrdersService = async() => {
    return await findAllOrders();
}

export const updateOrderService = async(orderId, data) => {

    const order = await findOrderById(orderId);

    if(!order) {
        throw new ApiError(404, "Order not found.");
    }

    if(order.orderStatus === ORDER_STATUS.CANCELLED) {
        throw new ApiError(400, "Cancelled order cannot be updated.");
    }


    order.orderStatus = data.orderStatus;   

    return await saveOrder(order);
}   