import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { cancelOrderService, createOrderService,  getAllOrdersService,  getMyOrderService,  getMyOrdersService, updateOrderService } from "../services/orderService.js";


export const createOrder = asyncHandler(async(req,res) => {

    const order = await createOrderService( req.user._id, req.validatedData );

    return res.status(201).json(
        new ApiResponse(201, "Order created successfully.", order)
    );
})

export const getMyOrders = asyncHandler(async(req,res) => {

    const orders = await getMyOrdersService(req.user._id);

    return res.status(200).json(
        new ApiResponse(200, "Orders fetched successfully.", orders)
    );
})

export const getMyOrder = asyncHandler(async(req,res) => {

    const order = await getMyOrderService(req.user._id, req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Order fetched successfully.", order)
    );
})

export const cancelOrder = asyncHandler(async(req,res) => {

    const order = await cancelOrderService(req.user._id, req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Order cancelled successfully.", order)
    );
})

export const getAllOrders = asyncHandler(async(req,res) => {
    const result = await getAllOrdersService(req.query);

    return  res.status(200).json(
        new ApiResponse(
            200,
            "Orders fetched successfully.",
            result
        )
    )

    return res.status(200).json(
        new ApiResponse(200, "Orders fetched successfully.", orders)
    );
})

export const updateOrder = asyncHandler(async(req,res) => {

    const order = await updateOrderService(req.params.id,req.validatedData);

    return res.status(200).json(
        new ApiResponse(200, "Order updated successfully.", order)
    );
})