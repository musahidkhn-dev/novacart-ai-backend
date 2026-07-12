import { createReviewService, deleteReviewService, getProductReviewsService, updateProductReviewService } from "../services/reviewService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const createReview = asyncHandler(async(req,res) => {

    const review = await createReviewService(
        req.user._id,
        req.validatedData
    );

    return res.status(201).json(
        new ApiResponse(201, "Review created successfully", review)
    );
})

export const getProductReviews = asyncHandler(async(req,res) => {

    const reviews = await getProductReviewsService(req.params.productId);
    console.log(reviews)
    return  res.status(200).json(
        new ApiResponse(200, "Reviews fetched successfully.", reviews)
    );
})

export const updateReview = asyncHandler(async(req,res) => {
    const review = await updateProductReviewService(
        req.user._id,
        req.params.id,
        req.validatedData,
    );

    return res.status(200).json(
        new ApiResponse(200, "Review updated successfully", review)
    );
})

export const deleteReview = asyncHandler(async(req,res) => {

    await deleteReviewService(
        req.user._id,
        req.params.id,
    );

    return res.status(200).json(
        new ApiResponse(200, "Review deleted successfully.")
    );
})