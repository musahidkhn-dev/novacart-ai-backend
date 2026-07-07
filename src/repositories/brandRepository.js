import Brand from "../models/brandModel.js";

export const findBrandByName = (name) => {

    return Brand.findOne({ name });
}

export const findBrandById = (id,data) =>{
    
    return Brand.findById(id,data);
}
export const findBrandBySlug = (slug) => {
    return Brand.findOne({ slug });
}

export const createBrand = (data) => {
        return Brand.create(data);
}
export const getAllBrands = () => {
    return Brand.find()
        .sort({ createdAt: -1 });
};

export const updateBrand = (id, data) => {
    return Brand.findByIdAndUpdate(id, data, {
        new: true,
    });
};

export const deleteBrand = (id) => {
    return Brand.findByIdAndDelete(id );
};