import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizedRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createReviewSchema, updateReviewSchema } from "../validators/reviewValidation.js";
import { createReview, deleteReview, getProductReviews, updateReview } from "../controllers/reviewController.js";
import { ROLES } from "../constants/roles.js";


const router = Router();

router.post("/", verifyJWT, authorizedRoles(ROLES.CUSTOMER), validate(createReviewSchema), createReview);
router.get("/product/:productId", getProductReviews);
router.patch("/:id", verifyJWT, authorizedRoles(ROLES.CUSTOMER), validate(updateReviewSchema), updateReview);
router.delete("/:id", verifyJWT, authorizedRoles(ROLES.CUSTOMER), deleteReview);

export default router;


