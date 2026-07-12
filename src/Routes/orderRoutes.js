import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createOrderSchema, updateOrderSchema } from "../validators/orderValidation.js";
import { cancelOrder, createOrder, getAllOrders, getMyOrder, getMyOrders, updateOrder } from "../controllers/orderController.js";


const router = Router();

router.post("/", verifyJWT, authorizeRoles("customer"), validate(createOrderSchema), createOrder);
router.get("/", verifyJWT, authorizeRoles("customer"), getMyOrders);
router.get("/:id", verifyJWT, authorizeRoles("customer"), getMyOrder);
router.patch("/:id/cancel", verifyJWT, authorizeRoles("customer"), cancelOrder);
router.get("/admin/all", verifyJWT, authorizeRoles("admin", "superAdmin"), getAllOrders);
router.patch("/admin/:id/status", verifyJWT, authorizeRoles("admin", "superAdmin"), validate(updateOrderSchema), updateOrder);


export default router;