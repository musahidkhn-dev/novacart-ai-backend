import z from "zod";
import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";
import { ROLES } from "../constants/roles.js";

export const updateUserStatusSchema = z.object({
    isActive: z.boolean({
        required_error: "isActive is required",
        invalid_type_error: "isActive must be a boolean",
    }),
});

export const validateUserId = (userId) => {
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError("Invalid user id.");
    }
}

export const updateUserRoleSchema = z.object({
    role: z.enum(Object.values(ROLES), {
        message: "Invalid role. Allowed roles are: admin, seller, customer, superAdmin."
    })
})