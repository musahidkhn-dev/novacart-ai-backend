import mongoose from "mongoose";

const couponUsageSchema = new mongoose.Schema(
    {
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        discountAmount: {
            type: Number,
            default: Date.now,
        },

        usedAt: {
            type: Date,
            default: Date.now,
        }
    },{
        timestamps: true,
    }
);


// One user can use one coupon only once
couponUsageSchema.index(
    {
        coupon:1,
        user:1,
    },
    {
        unique: true
    }
);

export default mongoose.model("CouponUsage", couponUsageSchema);