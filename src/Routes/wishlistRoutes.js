import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import { ROLES } from "../constants/roles.js";



const router = Router();

router.post("/:productId", verifyJWT, authorizeRoles(ROLES.CUSTOMER), addToWishlist);
router.get("/", verifyJWT, authorizeRoles(ROLES.CUSTOMER), getWishlist);
router.delete("/:productId", verifyJWT, authorizeRoles(ROLES.CUSTOMER), removeFromWishlist);

export default router;