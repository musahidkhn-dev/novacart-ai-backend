import ApiError from "../utils/apiError.js";
import generateUniqueSlug from "../utils/generateUniqueSlug.js";
import {
     createProduct,  findProductBySlug, getAllProducts, updateProduct, 
     deleteProduct, 
     findProductByNameAndStore,
     findProductById,
     saveProduct} from "../repositories/productRepository.js";
import { findStoreById } from "../repositories/storeRepository.js";
import { findBrandById } from "../repositories/brandRepository.js";
import { findCategoryById } from "../repositories/categoryRepository.js";
import cloudinary from "../config/cloudinary.js";


export const createProductService = async (data, userId) => {

    const exists = await findProductByNameAndStore(
        data.name,
        data.store
    );

    if(exists) {
        throw new ApiError(
            400,
            "Product already exists in this store."
        );
    }

    const store = await findStoreById(data.store);

    if(!store) {
        throw new ApiError(404, "Store not found");
    } 
    
    if(store.owner.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You can create product only in your own store."
        );
    };

    const brand = await findBrandById(data.brand);

    if(!brand) {
        throw new ApiError(404, "Brand not found");
    }

    const category = await findCategoryById(data.category);

    if(!category) {
        throw new ApiError(404, "Category not found");
    }



    const slug = await generateUniqueSlug(
        Product,
        data.name
    );

    return await createProduct({
        ...data,
        slug,
        createdBy: userId,
    });
};

export const getAllProductsService = async () => {
    return await getAllProducts();
};

export const getProductBySlugService = async (slug) => {

    const product = await findProductBySlug(slug);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }
    return product;
}

// export const getProductByNameService = async (name) => {

//     const product = await findProductByName(name);

//     if(!product) {
//         throw new ApiError(404, "Product not found");
//     }
//     return product;
// }

export const updateProductService = async (id, data) => {

    if(data.name) {

        data.slug = await generateUniqueSlug(
            Product,
            data.name
        );
    }

    
    const product = await updateProduct(id, data);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }
    return product;
}

export const deleteProductService = async (id, userId) => {

    const product = await findProductById(id);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }

    //Ownership Check
    if(product.createdBy.toString() !== userId.toString()) {
        throw new ApiError( 403, "You are not allowed to delete this product.");
    }

    //Delete all images from Cloudinary
    for( const image of product.images) {
        const result = await cloudinary.uploader.destroy(
            image.public_id
        );
        
        if(result.result !== "ok" && result.result !== "not found") {
            throw new ApiError(500, "Failed to delete image from Cloudinary.");
        }
    }
    
    await deleteProduct(id);

    return product;
};


export const uploadProductImageService = async (
    productId,
    files,
    userId
) => {

    const product = await findProductById(productId);

    if(!product) {
        throw new ApiError(404, "Product not found" );
    }

    if(product.createdBy.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not allowed to upload images for this product."
        );
    }

    const uploadImages = files.map((files, index) => ({
        url: files.path,
        public_id: files.filename,
        alt: product.name,
        isPrimary: product.images.length === 0 && index === 0,
    }));

    if(product.images.length + files.length > 10) {
        throw new ApiError(
            400,
            "Maximum 10 images are allowed per product."
        );
    }

    product.images.push(...uploadImages);

    await saveProduct(product);

    return product;
}

export const deleteProductImageService = async ( productId, imageId, userId ) => {

    const product = await findProductById(productId);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }

    if(product.createdBy.toString() !== userId.toString()) {
        throw new ApiError( 403, "You are not allowed to modify this product.");
    }

    const image = product.images.id(imageId);

    if(!image){
        throw new ApiError(404, "Image not found.");
    }

    await cloudinary.uploader.destroy(image.public_id);
    
    const wasPrimary = image.isPrimary;

    image.deleteOne();

    if(wasPrimary && product.images.length > 0 ) {
        product.images[0].isPrimary = true;
    }

    await saveProduct(product);
    
    return product;
};

