import { success } from "zod";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);
            console.log("Validate Data: ", req.validatedData);
            next();
        } catch (error) {
            console.log("===== zod error ========")
            console.log(error, {depth: null })
            return res.status(400).json({
                success: false,
                message: error.issue?.[0]?.message || "Validation Error",
                error: error.issue,
            });
        }
    };
};

export default validate;