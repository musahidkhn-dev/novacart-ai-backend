import ApiError from "../utils/apiError.js";

const authorizeRoles = (...roles) => {

    return (req, res, next) => {

          console.log("Allowed Roles:", roles);
        console.log("User Role:", req.user.role);
        console.log("Match:", roles.includes(req.user.role));
        if(!req.user){
            throw new ApiError(401, "Unauthorized");
        }

        if(!roles.includes(req.user.role)){
            throw new ApiError(
                403,
                "You don't have permission to perform this action."
            );
       
        }
        next();
        
    };
};

export default authorizeRoles;