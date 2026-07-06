import mongoose, { Mongoose } from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        employees: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },

                role: {
                    type: String,
                    enum: [
                        "manager",
                        "inventory_manager",
                        "order_manager",
                        "support",
                    ],
                },
            },
        ],

        
        storeName: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        logo: {
            type: String,
            default: "",
        },

        banner: {
            type: String,
            default: "",
        },

        phone: String,

        email: String,

        address: String,

        isVerified: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
        storeRatings: {
            type: Number,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Store", storeSchema)