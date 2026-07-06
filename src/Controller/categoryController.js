import asyncHandler  from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { createCategoryService, getAllCategoriesService } from "../services/categoryService.js";



export const createCategory = asyncHandler(async (req, res) => {
    const category = await createCategoryService(req);

    return res.status(201).json(
        new ApiResponse(201, "Category created successfully", category)
    );
});

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await getAllCategoriesService();

    return res.status(200).json(
        new ApiResponse(200, "Category fetched successfully", categories)
    );
});