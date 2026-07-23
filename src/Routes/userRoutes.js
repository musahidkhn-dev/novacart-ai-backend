import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { ROLES } from "../constants/roles.js";
import { getAllUsers, getUserById, updateUserRole, updateUserStatus } from "../controllers/userController.js";

const router = Router();

router.get("/", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllUsers);
router.patch("/:userId/status", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateUserStatus);
router.get("/:userId", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), getUserById);
router.patch("/:userId/role", verifyJWT, authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateUserRole);

export default router;