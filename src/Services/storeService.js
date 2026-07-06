import Store from "../models/storeModel.js";
import ApiError from "../utils/apiError.js";
import slugify from "slugify";


export const createStoreService = async (req) => {
    const { storeName, description, phone, email, address} = req.body;

    if(!storeName) {
        throw new ApiError(400, "Store name is required");
    }

    // Ek seller ki sirf ek store
    const existingStore = await Store.findOne({
        owner: req.user._id,
    });

    if(existingStore){
        throw new ApiError(400, "You already have a store");
    }

    // Slug generate
    let slug = slugify(storeName, {
        lower: true,
        strict: true,
    });

    // Slug duplicate check
    const slugExists = await Store.findOne({ slug });

    if(slugExists) {
        slug = `${slug}-${Date.now()}`;
    }

    // Store create
    const store = await Store.create({
        owner: req.user._id,
        storeName,
        slug,
        description,
        phone,
        email,
        address,
    });
    
    return store;
}

export const getMyStoreService = async (userId) => {

    const store = await Store.findOne({
        owner: userId,
    });

    if(!store) {
        throw new ApiError(
            404,
            "Store not found"
        );
    }
    return store;
};