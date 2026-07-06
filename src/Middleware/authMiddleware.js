import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/userModels.js';
import ApiError from '../utils/apiError.js';

const verifyJWT = async (req, res, next) => {
    try {
        
        const token = 
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401, "Unauthorized");
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);
        

        req.user = await User.findById(decoded.id   ).select("-password -refreshToken");

        next();
    } catch (error) {
        next(error);
    }
}

export default verifyJWT;