import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { addToCartSchema, updateChartItemSchema } from "../validators/cartValidation.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles(ROLES.CUSTOMER), validate(addToCartSchema), addToCart);
router.get("/", verifyJWT, authorizeRoles(ROLES.CUSTOMER), getCart);
router.patch("/items/:itemId", verifyJWT, authorizeRoles(ROLES.CUSTOMER), validate(updateChartItemSchema), updateCartItem);
router.delete("/items/:itemId", verifyJWT, authorizeRoles(ROLES.CUSTOMER), removeCartItem);
router.delete("/clear", verifyJWT, authorizeRoles(ROLES.CUSTOMER), clearCart);

export default router;