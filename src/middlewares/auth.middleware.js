const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils/common');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      errorResponse(StatusCodes.UNAUTHORIZED, 'Access denied. Token missing or malformed.')
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      errorResponse(StatusCodes.UNAUTHORIZED, 'Invalid token')
    );
  }
};
