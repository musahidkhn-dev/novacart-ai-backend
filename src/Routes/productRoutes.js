import { Router } from "express";
import { createProduct, getAllProducts,  getProductBySlug, updateProduct, deleteProduct,
       uploadProductImages, 
       deleteProductImage,
       } from "../controllers/productController.js";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import validate from "../middleware/validate.js";
import { createProductSchema, updateProductSchema } from "../validators/productValidation.js";
import upload from "../middleware/uploadMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();


router.post("/", verifyJWT, authorizeRoles(ROLES.SELLER, ), validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.patch("/:id", verifyJWT, authorizeRoles(ROLES.SELLER,),validate(updateProductSchema), updateProduct);
router.delete("/:id", verifyJWT, authorizeRoles(ROLES.SELLER, ), deleteProduct);
router.post("/:id/images", verifyJWT, authorizeRoles(ROLES.SELLER, ), upload.array("images", 10), uploadProductImages);
router.delete("/:productId/images/:imageId", verifyJWT, authorizeRoles(ROLES.SELLER), deleteProductImage)


export default router;