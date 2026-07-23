import { getAllUsersService, getUserByIdService, updateUserRoleService, updateUserStatusService } from "../services/userService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { updateUserRoleSchema, updateUserStatusSchema, validateUserId } from "../validators/userValidation.js";


export const getAllUsers = asyncHandler(async(req,res) => {

    const result =  await getAllUsersService(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Users fetched successfully",
            result
        )
    );
})

export const updateUserStatus = asyncHandler(async(req,res) => {

    const { userId } = req.params;

    // Validate ObjectId
    validateUserId(userId);

    //Validate Request Body
    const { isActive } = updateUserStatusSchema.parse(req.body);

    const updateUser = await updateUserStatusService(
        req.user._id,
        userId,
        isActive
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            `User ${isActive ? "activated" : "blocked"} successfully.`,
            updateUser
        )
    );
})


export const getUserById = asyncHandler(async(req,res) => {

    const { userId } = req.params;

    validateUserId(userId);

    const user = await getUserByIdService(userId);

    return res.status(200).json(
        new ApiResponse(
            200,
            "User fetched successfully.",
            user
        )
    )
})

export const updateUserRole = asyncHandler(async(req,res) => {

    const { userId } = req.params;
    const { role } = updateUserRoleSchema.parse(req.body);

    validateUserId(userId);

    const updatedUser = await updateUserRoleService(req.user, userId, role);

    return res.status(200).json(
        new ApiResponse(
            200, 
            "User role update successfully.",
            updatedUser
        )
    );
})