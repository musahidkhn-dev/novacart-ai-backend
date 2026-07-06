import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { createStore, getMyStore } from "../controller/storeController.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles("seller", "admin", "superAdmin"),createStore);
router.get("/me", verifyJWT, authorizeRoles("seller", "admin", "superAdmin"),getMyStore);

export default router;