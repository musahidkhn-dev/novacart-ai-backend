import { success } from "zod";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);
            console.log("Validate Data: ", req.validatedDate);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.errors?.[0]?.message || "Validation Error",
                error: error.errors,
            });
        }
    };
};

export default validate;