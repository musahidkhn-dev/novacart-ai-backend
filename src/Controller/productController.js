import { createProductService,
         getAllProductsService,
         getProductBySlugService,
         updateProductService,
         deleteProductService,
 } from "../services/productService.js";
 import ApiResponse from "../utils/apiResponse.js";
 import asyncHandler from "../utils/asyncHandler.js";

 export const  createProduct = asyncHandler(async (req, res) => {

    const product = await createProductService(
        req.validatedData,
        req.user._id,
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Product created successfully",
            product,
        )
    );
 });

 export const getAllProducts = asyncHandler(async (req, res) => {
    
    const products = await getAllProductsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Product fetched successfully",
            products,
        )
    );
 });

//  export const getProductByName = asyncHandler(async (req, res) => {

//     const product = await getProductByName(req.params.name);

//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             "Product fetched successfully",
//             product,
//         )
//     );
//  });

 export const getProductBySlug = asyncHandler(async (req, res) => {

    const product = await getProductBySlugService(req.params.slug);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Product fetched successfully",
            product,
        )
    );
 });

 export const updateProduct = asyncHandler(async (req, res) => {

    const product = await updateProductService(
        req.params.id,
        req.body,
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Product updated successfully",
            product,
        )
    );
 });

 export const deleteProduct = asyncHandler(async (req, res) => {

    const product = await deleteProductService( req.params.id );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Product deleted successfully",
            product,
        )
    );
 });