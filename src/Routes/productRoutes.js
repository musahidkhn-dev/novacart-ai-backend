import { Router } from "express";
import { createProduct, getAllProducts,  getProductBySlug, updateProduct, deleteProduct,
       uploadProductImages, 
       deleteProductImage,
       } from "../Controller/productController.js";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createProductSchema, updateProductSchema } from "../validators/productValidation.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

// Remove "superAdmin" after Seller Registration module is completed.
router.post("/", verifyJWT, authorizeRoles("seller", "superAdmin"), validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.patch("/:id", verifyJWT, authorizeRoles("seller", "superAdmin"),validate(updateProductSchema), updateProduct);
router.delete("/:id", verifyJWT, authorizeRoles("seller", "superAdmin"), deleteProduct);
router.post("/:id/images", verifyJWT, authorizeRoles("seller", "superAdmin"), upload.array("images", 10), uploadProductImages);
router.delete("/:productId/images/:imageId", verifyJWT, authorizeRoles("seller", "superAdmin"), deleteProductImage)


export default router;