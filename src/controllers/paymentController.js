
import { createPaymentService, getPaymentService, verifyPaymentService } from "../services/paymentService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createPayment = asyncHandler(async(req,res) => {

    const payment = await createPaymentService(
        req.user._id,
        req.validatedData,
    );

    return res.status(201).json(
        new ApiResponse(201, "Payment initiated successfully.", payment)
    );
})

export const verifyPayment = asyncHandler(async(req,res) => {

    const payment = await verifyPaymentService(req.validatedData);

    return res.status(200).json(
        new ApiResponse(200, "Payment verified successfully.", payment)
    );
})

export const getPayment = asyncHandler(async(req,res) => {

    const payment = await getPaymentService(
        req.user._id,
        req.params.orderId,
    );

    return res.status(200).json(
        new ApiResponse(200, "Payment fetched successfully.", payment)
    );
})  