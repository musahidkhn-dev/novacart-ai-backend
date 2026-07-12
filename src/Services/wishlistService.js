import { findProductById } from "../repositories/productRepository.js";
import { createWishlist, findWishlistsByUser, saveWishlist } from "../repositories/wishlistRepository.js";
import ApiError from "../utils/apiError.js";


export const addToWishlistService = async(userId, productId) => {

    const product = await findProductById(productId);

    if(!product) {
        throw new ApiError(404, "Product not found.");
    }
    console.log("Product:" , product)
    if(!product.status) {
        throw new ApiError(400, "Product is inactive");
    }

    let wishlist = await findWishlistsByUser(userId);

    if(!wishlist) {
      wishlist = await createWishlist({
        user: userId,
        products: [],
      });
    }

    const exists = wishlist.products.some(
        item => item._id.toString() === productId.toString()
    );

    if(exists) {
        throw new ApiError(400, "Product already exists in wishlist.");
    }

    wishlist.products.push(productId);

    return await saveWishlist(wishlist);
}; 

export const removeFromWishlistService = async(userId, productId) => {

    const wishlist = await findWishlistsByUser(userId);

    if(!wishlist) {
        throw new ApiError(404, "Wishlist not found.");
    }

    wishlist.products = wishlist.products.filter(
        item => item._id.toString() !== productId.toString()
    );

    return await saveWishlist(wishlist);
}

export const getWishlistService = (userId) => {

    const wishlist = findWishlistsByUser(userId);

    if(!wishlist) {
        return {
            products: [],
        };
    }

    return wishlist;
}

