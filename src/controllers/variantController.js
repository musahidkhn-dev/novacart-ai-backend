import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { createVariantService, deleteVariantImageService, deleteVariantService, getVariantByProductService, setPrimaryVariantImageService, updateVariantService, uploadVariantImagesService } from "../services/variantService.js";
import { success } from "zod";


export const createVariant = asyncHandler(async (req, res) => {

    const variant = await createVariantService(req.validatedData);

    return res.status(201).json(
        new ApiResponse(201, "Variant created successfully", variant)
    );
});

export const getVariantByProduct = asyncHandler(async (req, res) => {

    const variant = await getVariantByProductService(req.params.productId);

    return res.status(200).json(
        new ApiResponse(200, "Variant fetched successfully.", variant)
    );
});

export const updateVariant = asyncHandler(async (req, res) => {

    const variant = await updateVariantService(req.params.id, req.validatedData);

    return res.status(200).json(
        new ApiResponse(200, "Variant updated successfully", variant)
    );
});

export const deleteVariant = asyncHandler(async (req, res) => {

    const variant = await deleteVariantService(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Variant deleted successfully", variant)
    );
});

export const uploadVariantImages = asyncHandler(async (req, res) => {
    const variant = await uploadVariantImagesService(req.params.id,req.files);

    // console.log("Returned Variant:", variant)
    return res.status(200).json(
        new ApiResponse(200, "Images uploaded successfully.", variant)
    );
});

export const deleteVariantImage = asyncHandler(async (req, res) => {

    const variant = await deleteVariantImageService(
        req.params.id,
        req.params.imageId,
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Image deleted successfully.", 
            variant,
        )
    );
});


export const setPrimaryVariantImage = asyncHandler(async (req, res) => {

    const variant = await setPrimaryVariantImageService(
        req.params.id,
        req.params.imageId
    );

    return res.status(200).json(
        new ApiResponse(200, "Primary image updated", variant)
    );
});
