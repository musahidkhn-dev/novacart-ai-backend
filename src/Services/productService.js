import Product from "../models/productModel.js";
import ApiError from "../utils/apiError.js";
import generateUniqueSlug from "../utils/generateUniqueSlug.js";
import {
     createProduct,  findProductBySlug, getAllProducts, updateProduct, 
     deleteProduct, 
     findProductByNameAndStore} from "../repositories/productRepository.js";
import { findStoreById } from "../repositories/storeRepository.js";
import { findBrandById } from "../repositories/brandRepository.js";
import { findCategoryById } from "../repositories/categoryRepository.js";


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

export const deleteProductService = async (id) => {

    const product = await deleteProduct(id);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }
    return product;
}