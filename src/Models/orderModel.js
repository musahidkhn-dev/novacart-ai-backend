import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variant",
            required: true,
        },

        productName: {
            type: String,
            default: "",
        },

        sku: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        _id: false,
    }
);


const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
    },
    {
        _id: false,
    }
);


const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, 
        },

        orderItems: {
            type: [orderItemSchema],
            required: true,
        },

        shippingAddress: {
            type: [shippingAddressSchema],
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        shippingCharge: {
            type: Number,
            default: 0,
        },

        tax: {
            type: Number,
            default: 0,
        },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
            default: null,
        },

        discount: {
            type: Number,
            default: 0,
        },


        discount: {
            type: Number,
            default: 0,
        },

        grandTotal: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: Object.values(PAYMENT_METHOD),
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.PENDING,
        },

        orderStatus: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING,
        },
        orderNumber: {
            type: String,
            unique: true,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Order", orderSchema);