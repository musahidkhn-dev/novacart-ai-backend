import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { addToCartService, clearCartService, getCartService, removeCartItemService, updateCartItemService } from "../services/cartService.js";

export const addToCart = asyncHandler(async (req, res) => {
    const cart = await addToCartService(
        req.user._id,
        req.validatedData,
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Item added to cart.",
            cart
        )
    );
});

export const getCart = asyncHandler(async(req,res) => {
    const cart = await getCartService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
        200,
        "Cart fetched successfully.",
        cart
        )
    );
})

export const updateCartItem = asyncHandler(async(req, res) => {
    
    const cart = await updateCartItemService(req.user._id, req.params.itemId, req.validatedData.quantity);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Cart updated successfully.",
            cart
        )
    );
})

export const removeCartItem = asyncHandler(async(req,res) => {
    const cart = await removeCartItemService(req.user._id, req.params.itemId);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Item removed successfully.",
            cart
        )
    );
}); 

export const clearCart = asyncHandler(async(req, res) => {
    const cart = await clearCartService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Cart cleared successfully.",
            cart
        )
    );
});

