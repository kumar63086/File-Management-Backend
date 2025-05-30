const { errorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');

const globalErrorHandler = (err, req, res, next) => {
  console.error(' Global Error:', err);

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(409).json(
      errorResponse(409, 'Duplicate field value entered', err.keyValue)
    );
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      errorResponse(err.statusCode, err.message, err.explanation)
    );
  }

  return res.status(500).json(
    errorResponse(500, 'Internal Server Error', err.message || 'Unexpected error occurred')
  );
};

module.exports = globalErrorHandler;