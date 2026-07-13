import CouponUsage from "../models/couponUsageModel.js";

export const createCouponUsage = (data) => {
    return CouponUsage.create(data);
}

export const findCouponUsage = (couponId, userId) => {
    return CouponUsage.findOne({
        coupon: couponId,
        user: userId,
    });
    
}

export const countCouponUsage = (couponId) => {
    return CouponUsage.countDocuments({coupon: couponId});
}
