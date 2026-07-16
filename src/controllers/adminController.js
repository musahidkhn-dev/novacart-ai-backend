import { getBrandWiseService, getCategoryWiseSalesService, getCouponAnalyticsService, getDashboardService,  getLowStockProductsService,  getMonthlySalesService,  getOrderStatusAnalyticsService,  getPaymentAnalyticsService,  getRecentOrdersService, getRevenueAnalyticsService, getTopCustomersService, getTopSellingProductsService } from "../services/adminService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



export const getDashboard = asyncHandler(async(req,res) => {

    const dashboard = await getDashboardService();

    return res.status(200).json(
        new ApiResponse(200,  "Dashboard fetched successfully.", dashboard)
    );
}) 

export const getRecentOrders = asyncHandler(async(req,res) => {

    const orders = await getRecentOrdersService();

    return res.status(200).json(
        new ApiResponse(200,  "Recent orders fetched successfully.", orders)
    );
})

export const getLowStockProducts = asyncHandler(async(req, res) => {

    const products = await getLowStockProductsService();

    return res.status(200).json(
        new ApiResponse(200, "Low stock products fetched successfully.", products)
    );
})

export const getTopSellingProducts = asyncHandler(async(req,res)=> {

    const products = await getTopSellingProductsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Top Selling products fetched successfully.",
            products
        )
    );
});

export const getRevenueAnalytics = asyncHandler(async(req,res) => {
    const analytics = await getRevenueAnalyticsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Revenue analytics fetched successfully.",
            analytics
        )
    );
})

export const getMonthlySales = asyncHandler(async(req,res) => {

    const sales = await getMonthlySalesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Monthly sales fetched successfully.",
            sales
        )
    );
})

export const getTopCustomers = asyncHandler(async(req,res) => {

    const customers = await getTopCustomersService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Top customer fetched successfully.",
            customers
        )
    );
})

export const getOrderStatusAnalytics = asyncHandler(async(req,res) => {

    const analytics = await getOrderStatusAnalyticsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Order status analytics fetched successfully.",
            analytics
        )
    );
})


export const getPaymentAnalytics = asyncHandler(async(req, res) => {

    const payment = await getPaymentAnalyticsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Payment analytics fetched successfully.",
            payment
        )
    );
})

export const getCouponAnalytics = asyncHandler(async(req,res) => {

    const analytics = await getCouponAnalyticsService();

    return res.status(200).json(
        new ApiResponse(
            200,
        "Coupon analytics fetched successfully.",
        analytics
        )
    );
})

export const getCategoryWiseSales = asyncHandler(async(req,res) => {

    const sales = await getCategoryWiseSalesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Category wise sales fetched successfully.",
            sales
        )
    );
})

export const getBrandWiseSales = asyncHandler(async(req,res) => {

    const sales = await getBrandWiseService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Brand wise sales fetched successfully.",
            sales
        )
    );
})