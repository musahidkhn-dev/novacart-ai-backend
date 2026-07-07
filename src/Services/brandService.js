import ApiError from "../utils/apiError.js";
import generateUniqueSlug from "../utils/generateUniqueSlug.js";
import { createBrand, deleteBrand, findBrandByName, findBrandBySlug, getAllBrands, updateBrand } from "../repositories/brandRepository.js";
import Brand from "../models/brandModel.js";

export const createBrandService = async (data, userId) => {
   
    const exists = await findBrandByName(data.name);

    if(exists) {
        throw new ApiError(400, "Brand already exists");
    }

    const slug = await generateUniqueSlug(
        Brand,
        data.name
    );


    return await createBrand({
        ...data,
        slug,
        createdBy: userId,
    });

};

export const getAllBrandsService = async () => {
    return await getAllBrands();
}

export const getBrandBySlugService = async(slug) => {

    const brand = await findBrandBySlug(slug);

    if(!brand) {
        throw new ApiError(404, "Brand not found");
    }
    return brand;
};

export const updateBrandService = async(id, data) => {
    
    const brand = await updateBrand(id, data);

    if(!brand) {
        throw new ApiError(404, "Brand not found");
    }

    return brand;
};

export const deleteBrandService = async(id) => {

    const brand = await deleteBrand(id);

    if(!brand) {
        throw new ApiError(404, "Brand not found")
    }

    return brand;
};