import Brand from "../models/brandModel.js";

export const createBrand = (data) => {

    return Brand.create(data);
}

export const findBrandByName = (name) => {

    return Brand.findOne({ name });
}

export const findBrandBySlug = (slug) => {

    return Brand.findOne({ slug });
}

export const getAllBrands = () => {

    return Brand.find()
        .sort({ createdAt: -1 });
};
