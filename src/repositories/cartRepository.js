import Cart from "../models/cartModel.js";

export const findCartByUser = (userId) => {
    return Cart.findOne({ user: userId })
        .populate({
            path: "items.variant",
            populate: {
                path: "product",
                select: "name slug",
            },
        });
}

export const findCartById = (id) => {
    return Cart.findById(id);
}
export const createCart = (data) => {
    return Cart.create(data);
}

export const saveCart = (cart,session=null) => {
    return cart.save({session});
}

export const deleteCart = (id) => {
    return Cart.findByIdAndDelete(id);
}