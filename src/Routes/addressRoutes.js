import { Router } from "express";
import { createAddressSchema, updateAddressSchema } from "../validators/addressValidation.js";
import { createAddress, deleteAddress,  getAllAddresses, updateAddress } from "../controllers/addressController.js";
import validate from "../middleware/validate.js";
import authorizedRoles from "../middleware/authorizationRoles.js";
import verifyJWT from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", verifyJWT, authorizedRoles("customer"), validate(createAddressSchema), createAddress);
router.get("/", verifyJWT, authorizedRoles("customer"), getAllAddresses);
router.patch("/:id", verifyJWT, authorizedRoles("customer"), validate(updateAddressSchema), updateAddress);
router.delete("/:id", verifyJWT, authorizedRoles("customer"), deleteAddress);

export default router;
