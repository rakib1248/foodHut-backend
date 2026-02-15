import { Prisma } from "../../generated/prisma/client";
function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    // Prisma validation error
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid or missing fields";
    }
    // Prisma known errors
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            statusCode = 404;
            message = "Resource not found";
        }
        if (err.code === "P2002") {
            statusCode = 409;
            message = "Duplicate entry";
        }
        if (err.code === "P2003") {
            statusCode = 400;
            message = "Invalid reference (foreign key constraint)";
        }
    }
    // Prisma initialization errors
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            statusCode = 401;
            message = "Database authentication failed";
        }
        if (err.errorCode === "P1001") {
            statusCode = 503;
            message = "Database server unreachable";
        }
    }
    console.error(err);
    res.status(statusCode).json({
        ok: false,
        message,
    });
}
export default errorHandler;
