import { Router } from "express";
import { createAddressSchema, updateAddressSchema } from "../validators/addressValidation.js";
import { createAddress, deleteAddress,  getAllAddresses, updateAddress } from "../controllers/addressController.js";
import validate from "../middleware/validate.js";
import authorizedRoles from "../middleware/authorizationRoles.js";
import verifyJWT from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/", verifyJWT, authorizedRoles(ROLES.CUSTOMER), validate(createAddressSchema), createAddress);
router.get("/", verifyJWT, authorizedRoles(ROLES.CUSTOMER), getAllAddresses);
router.patch("/:id", verifyJWT, authorizedRoles(ROLES.CUSTOMER), validate(updateAddressSchema), updateAddress);
router.delete("/:id", verifyJWT, authorizedRoles(ROLES.CUSTOMER), deleteAddress);

export default router;
