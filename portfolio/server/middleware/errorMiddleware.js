import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let details = err.details;

  // Mongoose: invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  }

  // Mongoose: schema validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(err.errors).map((e) => e.message);
  }

  // Mongo duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    message = `Duplicate value for ${field}`;
  }

  // JWT
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired session";
  }

  const isProd = process.env.NODE_ENV === "production";

  // Never leak internals for unexpected errors in production.
  if (statusCode === 500 && isProd) {
    message = "Internal server error";
    details = undefined;
  }

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    ...(!isProd && statusCode === 500 && { stack: err.stack }),
  });
};