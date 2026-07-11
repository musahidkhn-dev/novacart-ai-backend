import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { addToCartSchema, updateChartItemSchema } from "../validators/cartValidation.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles("customer"), validate(addToCartSchema), addToCart);
router.get("/", verifyJWT, authorizeRoles("customer"), getCart);
router.patch("/items/:itemId", verifyJWT, authorizeRoles("customer"), validate(updateChartItemSchema), updateCartItem);
router.delete("/items/:itemId", verifyJWT, authorizeRoles("customer"), removeCartItem);
router.delete("/clear", verifyJWT, authorizeRoles("customer"), clearCart);

export default router;