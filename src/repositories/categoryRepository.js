import Category from "../models/categoryModel.js";

export const findCategoryById = (id) => {
    return Category.findById(id);
}

export const findCategoryByName = (name) => {
    return Category.findOne({ name });
}

export const getAllCategory = () => {
    return Category.find()
                .populate("parentCategory", "name slug")
                .sort({ createdAt: -1 });
};

export const updateCategory = (id, data) => {
    return Category.findByIdAndUpdate(id,data, {
        new: true,
    });
}

export const deleteCategory = (id) => {
    return Category.findOneAndDelete(id);
}
