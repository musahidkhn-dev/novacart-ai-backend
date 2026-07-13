import Order from "../models/orderModel.js";

export const createOrder = (data,session=null) => {
    return Order.create(data,{session});
}

export const findOrderById = (id) => {
    return Order.findById(id);
}

export const findOrderByUser = (userId) => {
    return Order.find({user:userId}).sort({ createdAt: -1 });
}

export const findAllOrders = () => {
    return Order.find().sort({ createdAt: -1}).populate("user", "fullName email")
}


export  const saveOrder = (order, session = null) => {
    return order.save().populate("order").session(session);
}

