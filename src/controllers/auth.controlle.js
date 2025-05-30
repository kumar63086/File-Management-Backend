const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { errorResponse, successResponse } = require('../utils/common');
const catchAsync = require('../utils/catchAsync/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(errorResponse(StatusCodes.CONFLICT, 'User already exists'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(StatusCodes.CREATED).json(
    successResponse(StatusCodes.CREATED, 'User registered successfully', { user })
  );
});

exports.login = catchAsync(async (req, res) => {
   

  const { email, password } = req.body;

  // Explicitly select password field
  const user = await User.findOne({ email }).select('+password');
 

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      errorResponse(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    );
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  res.status(StatusCodes.OK).json(
    successResponse(StatusCodes.OK, 'Login successful', { token })
  );
});

exports.logout = catchAsync(async (req, res) => {
  res.clearCookie('token'); // assuming token was set in cookie
  res.status(StatusCodes.OK).json(
    successResponse(StatusCodes.OK, 'Logout successful')
  );
});

exports.healthCheck = catchAsync(async (req, res) => {
    return res
        .status(StatusCodes.OK)
        .json(successResponse(StatusCodes.OK, 'Auth service is healthy'));
});