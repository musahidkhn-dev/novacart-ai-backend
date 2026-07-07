import { createBrandService, deleteBrandService, getAllBrandsService, getBrandBySlugService, updateBrandService } from "../services/brandService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createBrand  = asyncHandler(async (req, res) => {

    const brand = await createBrandService(
        req.validatedData,
        req.user._id,
       
    );
    

    return res.status(201).json(
        new ApiResponse(
            201, 
            "Brand created successfully",
            brand
        )
    );

});

export const getAllBrands = asyncHandler(async (req, res) => {

    const brands = await getAllBrandsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Brands fetched successfully",
            brands
        )
    );
});

export const getBrandBySlug = asyncHandler(async (req, res) => {
    
    const brand = await getBrandBySlugService(req.params.slug);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Brand fetched successfully",
            brand
        )
    );
});

export const updateBrand = asyncHandler(async (req, res) => {

    const brand = await updateBrandService(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Brand updated successfully",
            brand
        )
    );
});

export const deleteBrand = asyncHandler(async (req, res) => {
    await deleteBrandService(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Brand deleted successfully"
        )
    );
});

