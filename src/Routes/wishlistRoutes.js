import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";



const router = Router();

router.post("/:productId", verifyJWT, authorizeRoles("customer"), addToWishlist);
router.get("/", verifyJWT, authorizeRoles("customer"), getWishlist);
router.delete("/:productId", verifyJWT, authorizeRoles("customer"), removeFromWishlist);

export default router;