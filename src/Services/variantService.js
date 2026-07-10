import ApiError from "../utils/apiError.js";
import normalizeAttributes from "../utils/normalizeAttributes.js";
import generateSKU from "../utils/generateSKU.js";
import { createVariant, deleteVariant, findVariantById, findVariantBySKU, findVariantByVariantKey, getVariantByProduct, saveVariant, updateVariant } from "../repositories/variantRepository.js";
import generateVariantKey from "../utils/generateVariantKey.js";
import { findProductById } from "../repositories/productRepository.js";
import cloudinary from "../config/cloudinary.js";




export const createVariantService = async(data) => {
    
    const product = await findProductById(data.product);
    if(!product) {
        throw new ApiError(404, "Product not found");
    }

    const attributes = normalizeAttributes(data.attributes);

    const variantKey = generateVariantKey(attributes);

    const existingVariant = await findVariantByVariantKey(
        data.product,
        variantKey
    );

    if(existingVariant) {
        throw new ApiError(400, "Variant already exists.");
    }

    let sku = generateSKU(product.name,attributes); 

    let counter = 2;
    while (
        await findVariantBySKU(sku)
    ) {
        sku = `${generateSKU(product.name,attributes)}-${counter}`;
        counter++;
    }

    return await createVariant({
        ...data,
        attributes,
        sku,
        variantKey,
    });
}

export const getVariantByProductService = async (productId) => {
 
    const product = await findProductById(productId);
    
    if(!product) {
        throw new ApiError(404, "Product not found.");
    }

    return await getVariantByProduct(productId);
}

export const updateVariantService = async (id, data) => {

    const variant = await findVariantById(id);

    if(!variant) {
        throw new ApiError(404, "Variant not found.");
    }

    return await updateVariant(id, data);
}

export const deleteVariantService = async (id) => {

    const variant = await deleteVariant(id);

    if(!variant) {
        throw new ApiError(404, "Variant not found.");
    }
    for( image of variant.images) {
       const result = await cloudinary.uploader.destroy(
            image.public_id
        );

        if (result.result !== "ok") {
            throw new ApiError(500, "Failed to delete image.");
        }
    }

    return await deleteVariant(id);
}

export const uploadVariantImagesService = async(id, files) => {
       
    const variant = await findVariantById(id);
    if(!variant) {
        throw new ApiError(404, "Variant not found.");
    }

    const uploadImages = files.map(file => ({
        url: file.path,
        public_id: file.filename,
        alt: variant.sku,
        isPrimary: false,
    }));

    if(variant.images.length === 0 && uploadImages.length > 0) {
        uploadImages[0].isPrimary = true;
    }
    if(variant.images.length + files.length > 10) {
        throw new ApiError(400, "Maximum 10 images allowed.")
    }

    variant.images.push(...uploadImages);

    return await saveVariant(variant);
};

export const deleteVariantImageService = async(variantId, imageId) => {

    
    const variant = await findVariantById(variantId);
  
    if(!variant) {
        throw new ApiError(404, "Variant not found.");
    }

    const image = variant.images.id(imageId);
   
    

    if(!image) {
        throw new ApiError(404, "Image not found.");
    }

    await cloudinary.uploader.destroy(
        image.public_id
    );

    image.deleteOne();

    if(!variant.images?.some(img => img.isPrimary ) && variant.images.length > 0) {
        variant.images[0].isPrimary = true;
    }

    return await  saveVariant(variant);
};

export const setPrimaryVariantImageService = async(variantId, imageId) => {
    const variant = await findVariantById(variantId);

    if(!variant) {
        throw new ApiError(404, "Variant not found.")
    }

    const image = variant.images.id(imageId);

    if(!image) {
        throw new ApiError(404, "Image not found.");
    }
    
    if(variant.images.length ===0) {
        throw new ApiError(400, "No image found for this variant.")
    }

    variant.images.forEach(image => {
        image.isPrimary = 
            image._id.toString() === imageId;
    });

    return await saveVariant(variant);

}