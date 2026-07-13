import { ORDER_STATUS } from "../constants/orderStatus.js";
import { findOrderById } from "../repositories/orderRepository.js";
import { findProductById, saveProduct } from "../repositories/productRepository.js";
import { createReview, deleteReview, findReviewById, findReviewByUserAndProduct, findReviewsByProduct, saveReview } from "../repositories/reviewRepository.js";
import ApiError from "../utils/apiError.js";


export const createReviewService = async(userId, data) => {
    
    const product = await findProductById(data.productId);

    if(!product) {
        throw new ApiError(404, "Product not found.");
    }

    const order = await findOrderById(data.orderId);

    if(!order) {
        throw new ApiError(404, "Order not found.");
    }

    if(order.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }

    if(order.orderStatus !== ORDER_STATUS.DELIVERED) {
        throw new ApiError(400, "Only delivered orders can reviewed.");
    }
    
    const purchased = order.orderItems.some(item=> item.product.toString() === data.productId);

    if(!purchased) {
        throw new ApiError(400, "Product not found in this order.");
    }

    const existingReview = await findReviewByUserAndProduct(
        userId,
        data.productId
    );

    if(existingReview) {
        throw new ApiError(400, "You have already reviewed this product.");
    }

    const review = await createReview({
        user: userId,
        product: data.productId,
        order: data.orderId,
        rating: data.rating,
        comment: data.comment,
    });

    await updateProductRating(
        data.productId
    );
    return review;
}

export const getProductReviewsService = async(productId) => {
   
    const product = await findReviewsByProduct(productId);
   
    return product
}

export const updateProductReviewService = async(userId, reviewId, data) => {
    const review = await findReviewById(reviewId);

    if(!review) {
        throw new ApiError(404, "Review not found.");
    }

    if(review.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }

    Object.assign(review,data);
    await saveReview(review);

    await updateProductRating(review.product);
    
    return review;
}

export const updateProductRating = async(productId) => {

    const reviews = await findReviewsByProduct( productId );

    const totalReviews = reviews.length;
    const averageRating = totalReviews === 0 ? 0 : reviews.reduce((sum,review) => sum + review.rating, 0 ) / totalReviews;
    const product = await findProductById(productId);
    product.totalReviews = totalReviews;
    product.averageRating = Number(averageRating.toFixed(1));

    await saveProduct(product);
}

export const deleteReviewService = async(userId, reviewId) => {
    const review = await findReviewById(reviewId);

    if(!review) {
        throw new ApiError(404, "Review not found.");
    }

    if(review.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }

    const productId = review.product;
    await deleteReview(reviewId);
    await updateProductRating(productId);
    return true;
}