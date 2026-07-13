import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { ROLES } from "../constants/roles.js";
import validate from "../middleware/validate.js";
import { createPaymentSchema, verifyPaymentSchema } from "../validators/paymentValidation.js";
import { createPayment, getPayment } from "../controllers/paymentController.js";
import { verifyPaymentService } from "../services/paymentService.js";

const router = Router();

router.post("/create", verifyJWT, authorizeRoles(ROLES.CUSTOMER), validate(createPaymentSchema), createPayment);
router.post("/verify", verifyJWT, validate(verifyPaymentSchema), verifyPaymentService);
router.get("/:orderId", verifyJWT, authorizeRoles(ROLES.CUSTOMER), getPayment);

export default router;