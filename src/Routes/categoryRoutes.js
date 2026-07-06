import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { createCategory, getAllCategories } from "../controller/categoryController.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles("admin", "superAdmin"), createCategory);
router.get("/", getAllCategories);

export default router;