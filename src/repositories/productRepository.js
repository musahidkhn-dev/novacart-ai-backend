import Product from "../models/productModel.js";

export const createProduct = (data) => {
    return Product.create(data);
}

export const findProductByNameAndStore = (name, storeId) => {
    return Product.findOne({ name, store: storeId, });
}

export const findProductBySlug = (slug) => {
    return Product.findOne({ slug })
            .populate("brand", "name slug")
            .populate("category", "name slug")
            .populate("store", "storeName slug");
}

export const getAllProducts = () => {
    return Product.find()
            .populate("brand", "name slug")
            .populate("category", "name slug")
            .populate("store", "storeName slug")
            .sort({ createdAt: -1 });
}

export const updateProduct = (id, data) => {
    return Product.findByIdAndUpdate(id, data, {
        new: true,
    }); 
} 

export const deleteProduct = (id) => {
    return Product.findByIdAndDelete(id);
}
