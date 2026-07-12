import mongoose from "mongoose";

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
            enum: ["COD", "ONLINE"],
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
            default: "pending",
        },

        orderStatus: {
            type: String,
            enum: ["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled", "returned"],
            default: "pending",
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