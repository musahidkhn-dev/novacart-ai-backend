import Category from "../models/categoryModel.js";
import ApiError from "../utils/apiError.js";
import generateUniqueSlug from "../utils/generateUniqueSlug.js";

export const createCategoryService = async (req) => {
    const { name, description, parentCategory } = req.body;

    if(!name) {
        throw new ApiError(400, "Category name is required");
    }

    const exists = await Category.findOne({ name });

    if(exists) {
        throw new ApiError(400, "Category already exists");
    }

    const slug = await generateUniqueSlug( Category, name);

    const category = await Category.create({
        name,
        slug,
        description,
        parentCategory,
    });
    
    return category;
};

export const getAllCategoriesService = async () => {

    return await Category.find()
        .populate("parentCategory", "name slug")
        .sort({ createdAt: -1 });
};