import mongoose, { mongo } from "mongoose";

export const variantSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        variantKey: {
            type: String,
            required: true,
        },

        barcode: {
            type: String,
            default: "",
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        weight: {
            type: Number,
            default: 0,
            min: 0,
        },

        attributes: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                
                value: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        ],

        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                 
                public_id: {
                    type: String,
                    required: true,
                },

                alt: {
                    type: String,
                    default: "",
                },

                isPrimary: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Variant", variantSchema);