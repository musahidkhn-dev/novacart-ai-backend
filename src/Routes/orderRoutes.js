import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createOrderSchema, updateOrderSchema } from "../validators/orderValidation.js";
import { cancelOrder, createOrder, getAllOrders, getMyOrder, getMyOrders, updateOrder } from "../controllers/orderController.js";
import { ROLES } from "../constants/roles.js";


const router = Router();

router.post("/", verifyJWT, authorizeRoles(ROLES.CUSTOMER), validate(createOrderSchema), createOrder);
router.get("/", verifyJWT, authorizeRoles(ROLES.CUSTOMER), getMyOrders);
router.get("/:id", verifyJWT, authorizeRoles(ROLES.CUSTOMER), getMyOrder);
router.patch("/:id/cancel", verifyJWT, authorizeRoles(ROLES.CUSTOMER), cancelOrder);
router.get("/admin/all", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllOrders);
router.patch("/admin/:id/status", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), validate(updateOrderSchema), updateOrder);


export default router;