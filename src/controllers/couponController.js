import { applyCouponService, createCouponService, deleteCouponService, getAllCouponsService, getCouponByIdService, removeCouponService, updateCouponService } from "../services/couponService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCoupon = asyncHandler(async(req,res) => {

    const coupon = await createCouponService(req.validatedData);

    return res.status(201).json(
        new ApiResponse(201, "Coupon created successfully.", coupon)
    );
})

export const getAllCoupon = asyncHandler(async(req,res) => {

    const coupons = await getAllCouponsService();

    return res.status(200).json(
        new ApiResponse(200, "Coupons fetched successfully.", coupons)
    );
})

export const getCouponById = asyncHandler(async(req,res) => {

    const coupon = await getCouponByIdService(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Coupon fetched successfully.", coupon)
    );
})

export const applyCoupon = asyncHandler(async(req,res) => {

    const result = await applyCouponService(
        req.user._id,
        req.validatedData,
    );

    return res.status(200).json(
        new ApiResponse(200, "Coupon applied successfully.", result)
    );
})

export const updateCoupon = asyncHandler(async(req,res) => {

    const coupon = await updateCouponService(
        req.params.id,
        req.validatedData,
    );

    return res.status(200).json(
        new ApiResponse(200, "Coupon updated successfully.", coupon)
    );
})

export const deleteCoupon = asyncHandler(async(req,res) => {

    await deleteCouponService(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Coupon deleted successfully.", null)
    );
})

export const removeCoupon = asyncHandler(async(req,res) => {

    const cart = await removeCouponService(req.user._id);

    return res.status(200).json(
        new ApiResponse(200, "Coupon removed successfully.")
    );
})