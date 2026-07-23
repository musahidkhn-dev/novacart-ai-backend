import { ROLES } from "../constants/roles.js";
import User from "../models/userModels.js";

export const findAllUsers = async({ page = 1, limit = 10, search, role, isActive, sort = "newest",}) => {

    const filter = {};

    // Search
    if(search?.trim()) {
        const regex = new RegExp(search.trim(), "i");

        filter.$or = [
          { fullName: regex },
          { email: regex },
        ];
    }

    //Role Filter
    if(role) {
        filter.role = role;
    }

    // Active Filter
    if(isActive !== undefined) {
        filter.isActive = isActive === "true";
    }

    //Sorting
    let sortOption = {};

    switch(sort) {
        case "oldest":
            sortOption = { createdAt: 1};
            break;

        case "nameAsc":
            sortOption = { fullName: 1};
            break;

        case "nameDesc":
            sortOption = { fullName: -1};
            break;

        case "newest":
        default:
            sortOption = { createdAt: -1};
    }

    const skip = (page -1) * limit;

    const [users, totalUsers] = await Promise.all([
        User.find(filter)
            .select("-password -refreshToken")
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean(),

        User.countDocuments(filter),
    ]);

    return {
        users,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            totalUsers,
            totalPages: Math.ceil(totalUsers/ limit),
            hasNextPage: page * limit < totalUsers,
            hasPrevPage: page > 1,
        },
    };
};

export const updateUserStatus = async(userId, isActive) => {

    return await User.findByIdAndUpdate(
        userId,
        { isActive },
        {
            new: true,
            runValidators: true
        }
    ).select("-password -refreshToken");
};

export const findUserById = async(userId) => {

    return await User.findById(userId)
        .select("-password -refreshToken")
        .lean();
}


export const updateUserRole = async(userId, role) => {
    return await User.findByIdAndUpdate(
        userId,
        { role },
        {
            new: true,
            runValidators: true
        }
    ).select("-password -refreshToken");
}

export const countSuperAdmins = async () => {
    return await User.countDocuments({
        role: ROLES.SUPER_ADMIN
    });
}