import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createVariantSchema, updateVariantSchema } from "../validators/variantValidation.js";
import { createVariant, deleteVariant, deleteVariantImage, getVariantByProduct, setPrimaryVariantImage, updateVariant, uploadVariantImages } from "../controller/variantController.js";
import upload from "../middleware/uploadMiddleware.js";


const router = Router();

// Remove "superAdmin" after Seller Registration module is completed.
router.post("/", verifyJWT, authorizeRoles("seller", "superAdmin"), validate(createVariantSchema), createVariant);
router.get("/product/:productId", getVariantByProduct);
router.patch("/:id", verifyJWT, authorizeRoles("seller", "superAdmin"), validate(updateVariantSchema), updateVariant);
router.delete("/:id", verifyJWT, authorizeRoles("seller", "superAdmin"), deleteVariant);
router.post("/:id/images", verifyJWT, authorizeRoles("seller", "superAdmin"), upload.array("images", 10),uploadVariantImages);
router.patch("/:id/images/:imageId/primary", verifyJWT, authorizeRoles("seller", "superAdmin"), setPrimaryVariantImage);
router.delete("/:id/images/:imageId", verifyJWT, authorizeRoles("seller", "superAdmin"), deleteVariantImage);

export default router;