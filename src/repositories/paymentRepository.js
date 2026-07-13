
import Payment from "../models/paymentModel.js";
import ApiError from "../utils/apiError.js";




export const createPayment = (data) => {
    return Payment.create(data);
}

export const findPaymentById = (id) => {
    return Payment.findById(id);
}

export const findPaymentByOrder = (orderId) => {
    return Payment.findOne({ order: orderId }).populate("order");
}


export const findPaymentByGatewayOrderId = (gatewayOrderId) => {
    return Payment.findOne({ gatewayOrderId }).populate("order");
}

export const savePayment = (payment, session = null) => {
    return payment.save({ session });
}
