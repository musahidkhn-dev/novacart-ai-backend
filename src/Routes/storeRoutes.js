import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizationRoles.js";
import { createStore, getMyStore } from "../controllers/storeController.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/", verifyJWT, authorizeRoles(ROLES.SELLER, ROLES.ADMIN,),createStore);
router.get("/me", verifyJWT, authorizeRoles(ROLES.SELLER, ROLES.ADMIN, ),getMyStore);

export default router;