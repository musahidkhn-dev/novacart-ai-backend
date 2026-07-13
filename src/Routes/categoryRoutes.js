import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { createCategory, getAllCategories } from "../controllers/categoryController.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), createCategory);
router.get("/", getAllCategories);

export default router;