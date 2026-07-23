import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {

    if(err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: err.issues?.[0]?.message || "Validation failed."
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;