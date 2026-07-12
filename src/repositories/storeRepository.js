import Store from "../models/storeModel.js";

export const findStoreByOwner = (ownerId) => {
    return Store.findOne({
        owner: ownerId,
    });
};

export const findStoreById = async (storeId) => {
    

    const store = await Store.findById(storeId);

    return store;
};