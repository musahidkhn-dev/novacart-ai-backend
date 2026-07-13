import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createBrand, deleteBrand, getAllBrands, getBrandBySlug, updateBrand } from "../controllers/brandController.js";
import { createBrandSchema } from "../validators/brandValidation.js";
import { getAllBrandsService } from "../services/brandService.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), validate(createBrandSchema), createBrand);
router.get("/", getAllBrands);
router.get("/:slug", getBrandBySlug);
router.patch("/:id", verifyJWT, authorizeRoles(ROLES.SUPER_ADMIN), updateBrand);
router.delete("/:id", verifyJWT, authorizeRoles(ROLES.SUPER_ADMIN), deleteBrand)

export default router;