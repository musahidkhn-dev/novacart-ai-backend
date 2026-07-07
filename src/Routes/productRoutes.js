import { Router } from "express";
import { createProduct, getAllProducts,  getProductBySlug, updateProduct, deleteProduct
       } from "../Controller/productController.js";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createProductSchema, updateProductSchema } from "../validators/productValidation.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles("seller", "superAdmin"), validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.patch("/:id", verifyJWT, authorizeRoles("seller", "superAdmin"),validate(updateProductSchema), updateProduct);
router.delete("/:id", verifyJWT, authorizeRoles("seller", "superAdmin"), deleteProduct);

export default router;