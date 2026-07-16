import User from "../models/userModels.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Variant from "../models/variantModel.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";
import CouponUsage from "../models/couponUsageModel.js";

export const countUsers = () => {
    return User.countDocuments();
}

export const countProducts = () => {
    return Product.countDocuments();
}

export const countOrders = () => {
    return Order.countDocuments();
}

export const countOrdersByStatus = (status) => {
    return Order.countDocuments({
        orderStatus: status,
    });
}

export const calculateTotalRevenue = async() => {
    
    const result = await Order.aggregate([
        {
            $match: {
                paymentStatus: "paid",
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$grandTotal",
                },
            },
        },
    ]);

    return result[0]?.totalRevenue || 0;    
}

export const getRecentOrders = () => {

    return Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "fullName email")
            .select("orderNumber grandTotal orderStatus paymentStatus createdAt user");

}

export const getLowStockProducts = (limit = 5, threshold = 5) => {
    return Variant.find({
        stock: { $lte: threshold },
        isActive: true,
    })
        .populate("product", "name slug")
        .sort({ stock: 1 })
        .limit(limit)
        .select("sku stock price product");
}

export const getTopSellingProducts = async(limit=5) =>  {
    const result = await Order.aggregate([
        {
            $unwind: "$orderItems"
        },

        {
            $group: {
                _id: "$orderItems.product",

                totalSold: {
                    $sum: "$orderItems.quantity"
                },

                revenue: {
                    $sum: {
                        $multiply: [
                            "$orderItems.quantity",
                            "$orderItems.price"
                        ]
                    }
                }
            }
        },
        {
            $sort: {
                totalSold: -1
            }
        }, 
        {
            $limit: limit
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            }
        },
        {
            $unwind: "$product"
        },
        {
            $project: {
                _id: 0,
                productId: "$product._id",
                productName: "$product.name",
                productSlug: "$product.slug",
                totalSold: 1,
                revenue: 1
            }
        }
    ]);

    console.log(result)
    return result;
};

export const getRevenueAnalytics = async() => {

    const now = new Date();

    const startOfToday =  new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
   );

   const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth()
   );

   const startOfYear = new Date(
    now.getFullYear(),
    0,
    1
   );

   const [today, month, year, total] = await Promise.all([
    Order.aggregate([
        {
            $match: {
                paymentStatus: PAYMENT_STATUS.PAID,
                orderStatus: ORDER_STATUS.DELIVERED,
                createdAt: { $gte: startOfToday }
            }
        },
        {
            $group: {
                _id: null,
                revenue: {
                    $sum: "$grandTotal"
                }
            }
        }
   ]),
   Order.aggregate([
    {
        $match: {
            paymentStatus: PAYMENT_STATUS.PAID,
            orderStatus: ORDER_STATUS.DELIVERED,
            createdAt: { $gte: startOfYear }
        }
    },
    {
        $group: {
            _id: null,
            revenue: {
                $sum: "$grandTotal"
            }
        }
    }
   ]),

   Order.aggregate([
    {
        $match: {
            paymentStatus: PAYMENT_STATUS.PAID,
            orderStatus: ORDER_STATUS.DELIVERED,
            createdAt: { $gte: startOfMonth }
        }
    },
    {
        $group: {
            _id: null,
            revenue: {
                $sum: "$grandTotal"
            }
        }
    }
   ]),
   Order.aggregate([
    {
        $match: {
            paymentStatus: PAYMENT_STATUS.PAID,
            orderStatus: ORDER_STATUS.DELIVERED,
        }
    },
    {
        $group: {
            _id: null,
            revenue: {
                $sum: "$grandTotal"
            }
        }
    }
   ])
   ]);

   return {
    todayRevenue: today[0]?.revenue || 0,
    thisMonthRevenue: month[0]?.revenue || 0,
    thisYearRevenue: year[0]?.revenue || 0 ,
    totalRevenue: total[0]?.revenue || 0,
   };
} 

export const getMonthlySales = async(year = new Date().getFullYear()) => {

    const startDate = new Date(year,0,1);
    const endDate = new Date(year + 1,0,1);

    return await Order.aggregate([
        {
            $match: {
                paymentStatus: PAYMENT_STATUS.PAID,
                orderStatus: ORDER_STATUS.DELIVERED,
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $group: {
                _id: {
                    month: {
                        $month: "$createdAt"
                    }
                },

                totalOrders: {
                    $sum: 1
                },

                revenue: {
                    $sum: "$grandTotal"
                }

            }
        },
        {
            $project: {
                _id: 0,
                month: "$_id.month",
                totalOrders: 1,
                revenue: 1
            }
        },
        {
            $sort: {
                month: 1
            }
        }
    ]);
}

export const getTopCustomers = async(limit = 5) => {
        return await Order.aggregate([
            {
                $match: {
                    paymentStatus: PAYMENT_STATUS.PAID,
                    orderStatus: ORDER_STATUS.DELIVERED,
                }
            },
            {
                $group: {
                    _id: "$user",
                    totalOrders: {
                        $sum: 1
                    },
                    totalSpent: {
                        $sum: "$grandTotal"
                    }
                }
            },
            {
                $sort: {
                    totalSpent: -1
                }
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,
                    userId: "$user._id",
                    fullName: "$user.fullName",
                    email: "$user.email",
                    totalOrders: 1,
                    totalSpent: 1

                }
            }
        ]);
}

export const getOrderStatusAnalytics = async() => {
    
    return await Order.aggregate([
        {
            $group: {
                _id: "$orderStatus",

                total: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                status: "$_id",
                total: 1
            }
        },
        {
            $sort: {
                total: -1
            }
        }
    ]);

}

export const getPaymentAnalytics = async() => {

    return await Order.aggregate([
        {
            $group: {
                _id: "$paymentStatus",
                total: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                status: "$_id",
                total: 1
            }
        },
        {
            $sort: {
                total: -1
            }
        }
    ]);
}

export const getCouponAnalytics = async() => {

    return await CouponUsage.aggregate([
        {
            $group: {
                _id: "$coupon",
                totalUsed: {
                    $sum: 1
                }
            }
        }, 
        {
            $sort:{
                totalUsed: -1
            }
        },
        {
            $lookup: {
                from: "coupons",
                localField: "_id",
                foreignField: "_id",
                as: "coupon"
            }
        },
        {
            $unwind: "$coupon"
        },
        {
            $project: {
                _id:0,
                couponId: "$coupon.id",
                couponCode: "$coupon.code",
                discountType: "$coupon.type",
                totalUsed: 1
            }
        }
    ]);
}

export const getCategoryWiseSales = async () => {

    return await Order.aggregate([
        {
            $match: {
                paymentStatus: PAYMENT_STATUS.PAID,
                orderStatus: ORDER_STATUS.DELIVERED
            }
        },
        {
            $unwind: "$orderItems"
        },
        {
            $lookup: {
                from: "products",
                localField: "orderItems.product",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $group: {
                _id: "$category._id",
                categoryName: {
                    $first: "$category.name"
                },
                totalSold: {
                    $sum: {
                        $multiply: [
                            "$orderItems.quantity",
                            "$orderItems.price"
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                categoryId: "$_id",
                categoryName: 1,
                totalSold: 1,
                revenue: 1
            }
        },
        {
            $sort: {
                revenue: -1
            }
        }
    ]);
}


export const getBrandWiseSales = async () => {

    return await Order.aggregate([
        {
            $match: {
                paymentStatus: PAYMENT_STATUS.PAID,
                orderStatus: ORDER_STATUS.DELIVERED
            }
        },

        {
            $unwind: "$orderItems"
        },

        {
            $lookup: {
                from: "products",
                localField: "orderItems.product",
                foreignField: "_id",
                as: "product"
            }
        },

        {
            $unwind: "$product"
        },

        {
            $lookup: {
                from: "brands",
                localField: "product.brand",
                foreignField: "_id",
                as: "brand"
            }
        },

        {
            $unwind: "$brand"
        },

        {
            $group: {

                _id: "$brand._id",

                brandName: {
                    $first: "$brand.name"
                },

                totalSold: {
                    $sum: "$orderItems.quantity",
                },

                revenue: {
                    $sum: {
                        $multiply: [
                            "$orderItems.quantity",
                            "$orderItems.price"
                        ]
                    }
                }
            }
            
        },
        {
            $project: {
                _id: 0,
                brandId: "$_id",
                brandName: 1,
                totalSold: 1,
                revenue: 1
            }
        },
        {
            $sort: {
                revenue: -1
            }
        }
    ]);
}