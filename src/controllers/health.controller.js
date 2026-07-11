import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
const healthController = (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200, 
            "NovaCart AI API is running",
            {
                uptime: process.uptime(),
                environment: process.env.NODE_ENV
            }
        )
    );
};

export default healthController