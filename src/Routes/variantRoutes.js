import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createVariantSchema, updateVariantSchema } from "../validators/variantValidation.js";
import { createVariant, deleteVariant, deleteVariantImage, getVariantByProduct, setPrimaryVariantImage, updateVariant, uploadVariantImages } from "../controllers/variantController.js";
import upload from "../middleware/uploadMiddleware.js";
import { ROLES } from "../constants/roles.js";


const router = Router();


router.post("/", verifyJWT, authorizeRoles(ROLES.SELLER), validate(createVariantSchema), createVariant);
router.get("/product/:productId", getVariantByProduct);
router.patch("/:id", verifyJWT, authorizeRoles(ROLES.SELLER), validate(updateVariantSchema), updateVariant);
router.delete("/:id", verifyJWT, authorizeRoles(ROLES.SELLER), deleteVariant);
router.post("/:id/images", verifyJWT, authorizeRoles(ROLES.SELLER), upload.array("images", 10),uploadVariantImages);
router.patch("/:id/images/:imageId/primary", verifyJWT, authorizeRoles(ROLES.SELLER), setPrimaryVariantImage);
router.delete("/:id/images/:imageId", verifyJWT, authorizeRoles(ROLES.SELLER), deleteVariantImage);

export default router;