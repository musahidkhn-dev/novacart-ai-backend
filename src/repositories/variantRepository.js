import Variant from "../models/variantModel.js";

export const createVariant = (data) => {
    return Variant.create(data);
}

export const findVariantById = (id) => {
    return Variant.findById(id)
        .populate(
            "product", "name slug"
        );
}

export const updateVariant = (id, data) => {
    return Variant.findByIdAndUpdate(id, data,{new:true});
}

export const findVariantByProduct = (productId) => {
    return Variant.find({
        product: productId,
    });
}

export const findVariantBySKU = (sku) => {
    return Variant.findOne({ sku });
}

export const deleteVariant = (id) => {
    return Variant.findByIdAndDelete(id);
}

export const saveVariant = (variant,session=null) => {
    return variant.save({session});
}

export const findVariantByVariantKey = (productId, variantKey) => {
    return Variant.findOne({
        product: productId,
        variantKey,
    });
}

export const getVariantByProduct = (productId) => {
    return Variant.find({
        product: productId,
    }).populate("product", "name slug").sort({ createdAt: -1 });
}

