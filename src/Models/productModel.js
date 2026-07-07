import mongoose, { mongo } from "mongoose";
import { required } from "zod/mini";
import { createBrand } from "../repositories/brandRepository.js";

const productSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String ,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            trim: true,
        },

        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },

        status: {
            type: String,
            enum: ["draft", "active", "inactive"],
            default: "draft",
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        seoTitle: {
            type: String,
            trim: true,
        },

        seoDescription: {
            type: String,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

 const product = mongoose.model("Product", productSchema);
 
 export default product;    