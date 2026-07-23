import Order from "../models/orderModel.js";

export const createOrder = (data,session=null) => {
    return Order.create(data,{session});
}

export const findOrderById = (id, session=null) => {
    return Order.findById(id).session(session);
}

export const findOrderByUser = (userId) => {
    return Order.find({user:userId}).sort({ createdAt: -1 });
}
export const findAllOrders = () => {
    return Order.find()
        .sort({ createdAt: -1 })
        .populate("user", "fullName email");
}

export const findAllOrdersWithFilters  = async (query) => {

    const {
        page = 1,
        limit = 10,
        search,
        orderStatus,
        paymentStatus,
        paymentMethod,
        sort= "newest"
    } = query;

    const filter = {};

    if(orderStatus) {
        filter.orderStatus = orderStatus;
    }

    if(paymentStatus) {
        filter.paymentStatus = paymentStatus;
    }

    if(paymentMethod) {
        filter.paymentMethod = paymentMethod;
    }

    if(search) {
        filter.orderNumber = {
            $regex: search,
            $options: "i"
        };
    }

    let sortOption = { createdAt: -1 };

    switch (sort) {

        case "oldest": 
            sortOption = { createdAt: 1 };
            break;
        
        case "newest": 
        default:
            sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([

        Order.find(filter)
            .populate("user", "fullName email")
            .sort(sortOption)
            .skip(Number(skip))
            .limit(Number(limit)),

        Order.countDocuments(filter)

    ]);

    return{
        orders,

        pagination: {

            page: Number(page),
            limit: Number(limit),
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            hasNextPage: Number(page) < Math.ceil(totalOrders / limit),
            hasPrevPage: Number(page) > 1
        }
    };

}
 

export  const saveOrder = (order, session = null) => {
    return order.save({session})
}

