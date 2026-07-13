import ApiError from "../utils/apiError.js";
import env from "../config/env.js";
import { findOrderById, saveOrder } from "../repositories/orderRepository.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { createPayment, findPaymentByGatewayOrderId, findPaymentByOrder, savePayment } from "../repositories/paymentRepository.js";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";
import Razorpay from "razorpay";
import { ORDER_STATUS } from "../constants/orderStatus.js";
import mongoose from "mongoose";

const razorpay = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
})

export const createPaymentService = async(userId, data) => {

    const order = await findOrderById(data.orderId);
    if(!order) {
        throw new ApiError(404, "Order not found.");
    }

    if(order.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }

    if(order.paymentStatus === PAYMENT_STATUS.PAID) {
        throw new ApiError(400, "Order already paid.");
    }

    const existingPayment = await findPaymentByOrder(order._id);

    if(existingPayment && existingPayment.status === PAYMENT_STATUS.PAID) {
        throw new ApiError(400, "Payment already completed.");
    }

    if(existingPayment.paymentMethod === PAYMENT_METHOD.ONLINE &&
        existingPayment.status === PAYMENT_STATUS.PENDING
    ) {
        return {
            payment: existingPayment,
            razorpayOrder: {
                id: existingPayment.gatewayOrderId,
                amount: existingPayment.amount * 100,
                currency: "INR",
            },
            key: env.RAZORPAY_KEY_ID,
        };
    }

    if(order.paymentMethod === PAYMENT_METHOD.COD) {

        const payment = await createPayment({
            user: userId,
            order: order._id,
            amount: order.grandTotal,
            paymentMethod: PAYMENT_METHOD.COD,
            status: PAYMENT_STATUS.PENDING,
            gateway: "COD",
        });

        return payment;
    }

    const razorpayOrder = await razorpay.orders.crate({
        amount: order.grandTotal * 100,
        currency: "INR",
        receipt: order.orderNumber,
    });

    const payment = await createPayment({
        user: userId,
        order: order._id,
        amount: order.grandTotal,
        paymentMethod: PAYMENT_METHOD.ONLINE,
        gateway: "razorpay",
        gatewayOrderId: razorpayOrder.id,
        status: PAYMENT_STATUS.PENDING
    });

    return {
        payment,
        razorpayOrder,
        key: env.RAZORPAY_KEY_ID,
    };
}

export const verifyPaymentService = async(data) => {

    const payment = await findPaymentByGatewayOrderId(data.razorpay_order_id);

    if(!payment) {
        throw new ApiResponse(404, "Payment not found.");
    }

    if(payment.status === PAYMENT_STATUS.PAID) {
        throw new ApiError(400, "Payment already verified.");
    }

    const generateSignature = crypto.createHmac("sha256", env.RAZORPAY_KEY_SECRET)
                                    .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
                                    .digest("hex");

    if(generateSignature !== data.razorpay_signature) {
        throw new ApiError(400, "Invalid payment signature.");
    }

    payment.gatewayPaymentId = data.razorpay_payment_id;
    payment.gatewaySignature = data.razorpay_signature;
    payment.status = PAYMENT_STATUS.PAID;
    order.orderStatus = ORDER_STATUS.PAID;
    order.orderStatus = ORDER_STATUS.CONFIRMED

    await saveOrder(order);
    return payment;
};

export const markCODAsPaidService = async( orderId ) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
    const payment = await findPaymentByOrder(orderId, session);

    if(!payment) {
        throw new ApiError(404, "Payment not found.");
    }

    if(payment.paymentMethod !== PAYMENT_METHOD.COD) {
        throw new ApiError(400, "This is not a COD payment.")
    }

    if(payment.status === PAYMENT_STATUS.PAID) {
        throw new ApiError(400, "Only delivered orders can be marked as paid.");
    }

    payment.status = PAYMENT_STATUS.PAID;
    payment.paidAt = new Date();

    order.paymentStatus = PAYMENT_STATUS.PAID;

    await savePayment(payment);
    await saveOrder(order);

    await session.commitTransaction();
    session.endSession();

    return payment;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;    
    }
};

export const getPaymentService = async(userId, orderId) => {

    const payment = await findPaymentByOrder(orderId).populate("order");

    if(!payment) {
        throw new ApiError(404, "Payment not found.");
    }

    if(payment.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized.");
    }

    return payment;
}