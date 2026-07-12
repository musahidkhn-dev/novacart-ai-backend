import Review from "../models/reviewModel.js";

export const createReview = (data) => {
    return Review.create(data);
}

export const findReviewById = (id) => {
    return Review.findById(id);
}

export const findReviewByUserAndProduct = (userId, productId) => {
    return Review.findOne({
        user: userId,
        product: productId,
    });
}

export const findReviewsByProduct = (productId) => {
    return Review.find({ product: productId }).populate("user", "fullName").sort({ cratedAt: -1 });
}

export const deleteReview  = (id) => {
    return Review.findByIdAndDelete(id);
}

export const saveReview = (review) => {
    return review.save();
}