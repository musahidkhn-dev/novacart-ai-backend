import { Router } from "express";
import { getCurrentUser, login, logout, register, refreshAccessToken } from "../controllers/authController.js";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/register", register);
router.post("/login", login)
router.get("/me", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logout)
router.post("/refresh-token", refreshAccessToken)

router.get("/admin-test", verifyJWT, authorizeRoles(ROLES.ADMIN) ,(req, res)=> {
    res.json({
        success: true,
        message: "Welcome Admin"
    });
});

export default router;