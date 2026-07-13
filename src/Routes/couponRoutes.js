import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { ROLES } from "../constants/roles.js";
import validate from "../middleware/validate.js";
import { applyCouponSchema, createCouponSchema, updateCouponSchema } from "../validators/couponValidation.js";
import { applyCoupon, createCoupon, deleteCoupon, getAllCoupon, getCouponById, updateCoupon } from "../controllers/couponController.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), validate(createCouponSchema), createCoupon);
router.get("/", getAllCoupon);
router.get("/:id", getCouponById);
router.patch("/:id", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), validate(updateCouponSchema), updateCoupon);
router.delete("/:id", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteCoupon);
router.post("/apply", verifyJWT, authorizeRoles(ROLES.CUSTOMER), validate(applyCouponSchema), applyCoupon);


export default router;