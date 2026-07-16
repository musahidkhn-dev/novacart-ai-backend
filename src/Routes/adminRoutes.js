import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { ROLES } from "../constants/roles.js";
import { getBrandWiseSales, getCategoryWiseSales, getCouponAnalytics, getDashboard,   getLowStockProducts,  getMonthlySales,  getOrderStatusAnalytics,  getPaymentAnalytics,  getRecentOrders, getRevenueAnalytics, getTopCustomers, getTopSellingProducts } from "../controllers/adminController.js";


const router = Router();

router.get("/dashboard", verifyJWT, authorizeRoles(ROLES.ADMIN,ROLES.SUPER_ADMIN), getDashboard);
router.get("/recent-orders", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getRecentOrders);
router.get("/low-stock", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getLowStockProducts);
router.get("/top-selling-products", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getTopSellingProducts);
router.get("/revenue-analytics", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getRevenueAnalytics);
router.get("/monthly-sales", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getMonthlySales);
router.get("/top-customer", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getTopCustomers);
router.get("/order-status", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getOrderStatusAnalytics);
router.get("/payment-status", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getPaymentAnalytics);
router.get("/coupon-analytics", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getCouponAnalytics);
router.get("/category-wise", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getCategoryWiseSales);
router.get("/brand-wise", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getBrandWiseSales);



export default router;