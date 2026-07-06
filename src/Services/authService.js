import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { generateRefreshToken,generateAccessToken } from "../utils/generateToken.js";
import validator from 'validator';
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

export const registerUser = async ({ fullName, email, password }) => {
    
    if(!fullName || !email || !password){
        throw new ApiError(400, "All fields are required");
    }

    if(!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email");
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword
    });

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
    };
};

export const loginUser = async ({ email, password }) => {
    if(!email || !password){
        throw new ApiError(400, "Email and password required");
    }
    
    const user = await User.findOne({ email });

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect ) {
        throw new ApiError(401, "Invalid Credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken;
    await user.save()

    return{
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

export const refreshAccessTokenService = async (req) => {
    
    const incomingRefreshToken = 
        req.cookies?.refreshToken || 
        req.body?.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized");
    }

    let decodedToken;
    try {
         decodedToken = jwt.verify(
             incomingRefreshToken,
             env.JWT_REFRESH_SECRET
        );    
    } catch (error) {
        throw new ApiError(401, "Invalid or Expired Refresh Token");
    }
    

    const user = await User.findById(decodedToken.id);

    if(!user){
        throw new ApiError(404, "User not found!");
    }

    if(incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(
            401,
            "Refresh Token Expired or Invalid"
        );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return{
        accessToken,
        refreshToken,
    };
} ;