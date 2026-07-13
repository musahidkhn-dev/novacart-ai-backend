import mongoose from "mongoose";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";


const paymentSchema = new mongoose.Schema(
    {
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

        amount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        gateway: {
            type: String,
            default: "razorpay",
        },

        paymentMethod: {
            type: String,
            enum: Object.values(PAYMENT_METHOD),
            required: true,
        },

        transactionId: {
            type: String,
            default: "",
        },

        gatewayOrderId: {
            type: String,
            default: "",
        },

        gatewayPaymentId: {
            type: String,
            default: "",
        },

        gatewaySignature: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.PENDING,
        },

        paidAt: {
            type: Date,
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Payment", paymentSchema);