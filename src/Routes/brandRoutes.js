import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createBrand, deleteBrand, getAllBrands, getBrandBySlug, updateBrand } from "../controller/brandController.js";
import { createBrandSchema } from "../validators/brandValidation.js";
import { getAllBrandsService } from "../services/brandService.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles("admin", "superAdmin"), validate(createBrandSchema), createBrand);
router.get("/", getAllBrands);
router.get("/:slug", getBrandBySlug);
router.patch("/:id", verifyJWT, authorizeRoles("superAdmin"), updateBrand);
router.delete("/:id", verifyJWT, authorizeRoles("superAdmin"), deleteBrand)

export default router;