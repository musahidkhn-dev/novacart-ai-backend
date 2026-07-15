import ApiError from "../utils/apiError.js";
import { findCartByUser, createCart, saveCart } from "../repositories/cartRepository.js";
import { findVariantById } from "../repositories/variantRepository.js";
import { findBrandById } from "../repositories/brandRepository.js";
import { recalculateCouponService } from "./couponService.js";

export const addToCartService = async (userId, data) => {
    const variant = await findVariantById(data.variant);

    if(!variant) {
        throw new ApiError(404, "Variant not found.");
    }

    if(!variant.isActive) {
        throw new ApiError(400, "Variant is inactive.");
    }

    if(variant.stock < data.quantity) {
        throw new ApiError(400, "Insufficient stock");
    }

    let cart = await findCartByUser(userId)

    if(!cart) {
        cart = await createCart({
            user: userId,
            items: [],
        });
    }

    const existingItem = cart.items.find(item => item.variant._id.toString() === variant._id.toString());

    if(existingItem) {
        const totalQuantity = existingItem.quantity + data.quantity;

        if(totalQuantity > variant.stock) {
            throw new ApiError(400, "Insufficient stock.");
        }
        existingItem.quantity = totalQuantity;
    } else {
        cart.items.push({
            variant: variant._id,
            quantity: data.quantity,
            priceAtAddTime: variant.price,
        });
    }
    await saveCart(cart)
    await recalculateCouponService(cart);
    return cart;
} ;

export const getCartService = async (userId) => {
    
    const cart = await findCartByUser(userId);

    if(!cart) {
        return {
            items: [],
            subtotal: 0,
            totalItems: 0,
        };
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.quantity * item.priceAtAddTime, 0 );

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0); 
    return {
        ...cart.toObject(),
        subtotal,
        totalItems,
    };
};


export const updateCartItemService = async (userId,itemId,quantity) => {

    const cart = await findCartByUser(userId);

    if(!cart) {
        throw new ApiError(404, "Cart not found.");
    }

    const item = cart.items.id(itemId);

    if(!item) {
        throw new ApiError(404, "Cart item not found.");
    }

    const variant = await findVariantById(item.variant);

    if(!variant) {
        throw new ApiError(404, "Variant not found.");
    }

    if(quantity > variant.stock) {
        throw new ApiError(400, "Insufficient stock.");
    }

    item.quantity = quantity;
    await saveCart(cart);   
    const updateCart = await recalculateCouponService(cart);
    return updateCart;
}

export const removeCartItemService = async (userId, itemId) => {
    const cart = await findCartByUser(userId);

    if(!cart) {
        throw new ApiError(404, "Cart not found.");
    }

    const item = cart.items.id(itemId);

    if(!item) {
        throw new ApiError(404, "Item not found.");
    }

    cart.items.pull(itemId);

    return await saveCart(cart);
}

export const clearCartService = async(userId) => {
    
    const cart = await findCartByUser(userId);

    if(!cart) {
        throw new ApiError(404, "Cart not found.");
    }

    cart.items = [];

    await saveCart(cart);
    await recalculateCouponService(cart);
    return cart;

}
