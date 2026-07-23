import { ROLES } from "../constants/roles.js";
import { findAllUsers, findUserById, updateUserRole, updateUserStatus } from "../repositories/userRepository.js";
import ApiError from "../utils/apiError.js";


export const getAllUsersService = async(query) => {

    const page = Math.max(Number(query.page) || 1, 1);

    // Max limit = 100
    const limit = Math.min(
        Math.max(Number(query.limit) || 10, 1),
        100
    );

    return await findAllUsers({
        page,
        limit,
        search: query.search,
        role: query.role,
        isActive: query.isActive,
        sort: query.sort
    });
};

export const updateUserStatusService = async(currentUserId, targetUserId, isActive) => {

    if(currentUserId.toString() === targetUserId.toString()) {
        throw new ApiError(
        400,
        "You cannot change your own active status.")
    }

    const existingUser = await findUserById(targetUserId);

    if(!existingUser) {
        throw new ApiError(404, "User not found.");
    }

    //Check if status is already same
    if(existingUser.isActive === isActive) {
        throw  new ApiError( 400, `User is already ${isActive ? "active" : "inactive"}.`);
    }

    //Update status
    const updateUser = await updateUserStatus(targetUserId, isActive);

    return updateUser;
}

export const getUserByIdService = async(userId) => {

    const user = await findUserById(userId).select("-password -refreshToken")

    if(!user) {
        throw new ApiError(404, "User not found.");
    }

    return user;
}

export const updateUserRoleService = async( currentUser, targetUserId, newRole) => {

    // Find target user
    const targetUser = await findUserById(targetUserId);

    if(!targetUser) {
        throw new ApiError(404, "User not found.");
    }

    //Prevent self role change
    if(currentUser._id.toString() === targetUserId.toString()) {
        throw new ApiError(400, "You cannot change your own role.");
    }

    // Same role check
    if(targetUser.role === newRole) {
        throw new ApiError(400, "User already has this role.");
    }

    //Only Super Admin can change another Super Admin
    if(targetUser.role === ROLES.SUPER_ADMIN &&
        currentUser.role !== ROLES.SUPER_ADMIN
    ) {
        throw new ApiError(
            404, "Only Super Admin can change another Super Admin's role."
        );
    }

    // Prevent removing last Super Admin
    if(
        targetUser.role === ROLES.SUPER_ADMIN && 
        newRole !== ROLES.SUPER_ADMIN
    ) {
        const superAdminCount = await countSuperAdmin();

        if(superAdminCount <= 1) {
            throw new ApiError(400, "At least one Super Admin must exist.");
        }
    }

    // Update role
    const updateUser = await updateUserRole(
        targetUserId,
        newRole
    );

    return updateUser;
}