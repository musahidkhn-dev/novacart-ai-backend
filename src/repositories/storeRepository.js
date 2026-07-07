import Store from "../models/storeModel.js";

export const findStoreByOwner = (ownerId) => {
    return Store.findOne({
        owner: ownerId,
    });
};

export const findStoreById = async (storeId) => {
    // return Store.findById(storeId);
    console.log("Searching Store:", storeId);

    const store = await Store.findById(storeId);

    console.log("Store Found:", store);

    return store;
};