import Wishlist from "../models/wishlistModel.js";


export const findWishlistsByUser = (userId) => {
    return Wishlist.findOne({ user: userId }).populate("products");
}

export const createWishlist = (data) => {
    return Wishlist.create(data);
}

export const saveWishlist = (wishlist) => {
    return wishlist.save();
}