import asyncHandler from "../utils/asyncHandler.js";
import { loginUser, registerUser, refreshAccessTokenService } from "../services/authService.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/userModels.js";

export const register = asyncHandler(async (req, res) => {
    
    const user = await registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            user,
        )
    );
});

export const login = asyncHandler(async (req, res) => {
    const {
        user,
        accessToken,
        refreshToken,
    } = await loginUser(req.body);

    const options = {
        httpOnly: true,
        secure: false,
    };
    
    return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Login successful",
            {
                user,
                accessToken,
                refreshToken,
            }
        )
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        
        new ApiResponse(

            200,
            "Current User",
            req.user
        )
    );
});

export const logout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            refreshToken: null
        }
    );

    const options = {
        httpOnly: true,
        secure: false
    };

    return res
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Logout Successfully"
            )
        );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const {
        accessToken,
        refreshToken,
    } = await refreshAccessTokenService(req);

    const options = {
        httpOnly: true,
        secure: false,
    };

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Access Token Refreshed Successfully",
                {
                    accessToken,
                    refreshToken,
                }
            )
        );
});