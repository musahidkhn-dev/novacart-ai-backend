import { ORDER_STATUS } from "../constants/orderStatus.js"
import { calculateTotalRevenue, countOrders, countOrdersByStatus, countProducts, countUsers, getBrandWiseSales, getCategoryWiseSales, getCouponAnalytics, getLowStockProducts, getMonthlySales, getOrderStatusAnalytics, getPaymentAnalytics, getRecentOrders, getRevenueAnalytics, getTopCustomers, getTopSellingProducts } from "../repositories/adminRepository.js"
import asyncHandler from "../utils/asyncHandler.js";



export const getDashboardService = async() => {

    const [
        totalUsers,
        totalProducts,
        totalOrders,
        pendingOrders,
        confirmOrders,
        cancelledOrders,
        deliveredOrders,
        totalRevenue,
    ] = await Promise.all([
        countUsers(),
        countProducts(),
        countOrders(),
        countOrdersByStatus(ORDER_STATUS.PENDING),
        countOrdersByStatus(ORDER_STATUS.CONFIRMED),
        countOrdersByStatus(ORDER_STATUS.CANCELLED),
        countOrdersByStatus(ORDER_STATUS.DELIVERED),
        calculateTotalRevenue(),
    ])

    return {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        confirmOrders,
        cancelledOrders,
        deliveredOrders,
    };
}

export const getRecentOrdersService =  () => {
    return  getRecentOrders();
}

export const getLowStockProductsService = () => {

    return getLowStockProducts();
    
}

export const getTopSellingProductsService = async() => {
    return await getTopSellingProducts();
}

export const getRevenueAnalyticsService = async() => {
    return await getRevenueAnalytics();
}

export const  getMonthlySalesService = async() => {
    return await getMonthlySales();
}

export const getTopCustomersService = async() => {
    return await getTopCustomers();
}

export const getOrderStatusAnalyticsService = async() => {

    return  await getOrderStatusAnalytics();
}

export const getPaymentAnalyticsService = async() => {
    return await getPaymentAnalytics();
}

export const getCouponAnalyticsService = async() => {
    return await getCouponAnalytics();
}

export const getCategoryWiseSalesService = async() => {
    return await getCategoryWiseSales();
} 

export const getBrandWiseService = async() => {
    return await getBrandWiseSales();
}