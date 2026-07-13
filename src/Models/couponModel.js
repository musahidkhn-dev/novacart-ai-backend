import mongoose from "mongoose";
import { COUPON_TYPE } from "../constants/couponType.js";

const couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },

    type: {
        type: String,
        enum: Object.values(COUPON_TYPE),
        required: true,
    },

    value: {
        type: Number,
        required: true,
    },

    minimumOrderAmount: {
        type: Number,
        default: 0,
    },

    maximumDiscount: {
        type: Number,
        default: 0,
    },

    usageLimit: {
        type: Number,
        default: 0,
    },

    perUserLimit: {
        type: Number,
        default: 1,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    startsAt: {
        type: Date,
        default: Date.now,
    },

    expiresAt: {
        type: Date,
        required: true,
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Coupon", couponSchema);