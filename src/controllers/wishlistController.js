import { addToWishlistService, getWishlistService, removeFromWishlistService } from "../services/wishlistService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const addToWishlist = asyncHandler(async(req,res) => {

    const wishlist = await addToWishlistService(
        req.user._id,
        req.params.productId,
    );

    return res.status(200).json(
        new ApiResponse(200, "Product added to wishlist.", wishlist)
    );
})

export const removeFromWishlist = asyncHandler(async(req,res) => {

    const wishlist = await removeFromWishlistService(
        req.user._id,
        req.params.productId,
    );

    return res.status(200).json(
        new ApiResponse(200, "Product removed from wishlist.", wishlist)
    );
})

export const getWishlist = asyncHandler(async(req,res) => {

    const wishlist = await getWishlistService(req.user._id);

    return res.status(200).json(
        new ApiResponse(200, "Wishlist fetched successfully.", wishlist)
    );
});