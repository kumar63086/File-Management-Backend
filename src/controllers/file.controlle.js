const File = require('../models/file.model');
const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { errorResponse, successResponse } = require('../utils/common');
const catchAsync = require('../utils/catchAsync/catchAsync');

// Upload File Controller
exports.uploadFile = catchAsync(async (req, res) => {
  console.log('File upload request received.');
  console.log('Uploaded file details:', req.file);
  console.log('Additional form data:', req.body);
  console.log('User details:', req.user);

  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        errorResponse(StatusCodes.BAD_REQUEST, 'No file uploaded')
      );
    }

    const file = await File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      mimetype: req.file.mimetype,
      user: req.user._id,
      title: req.body.title || '',
      description: req.body.description || ''
    });
    await file.save();

    res.status(StatusCodes.CREATED).json(
      successResponse(StatusCodes.CREATED, 'File uploaded successfully', { file })
    );
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      errorResponse(StatusCodes.BAD_REQUEST, 'Invalid file upload')
    );
  }
});

// Get All Files by User
exports.getUserFiles = catchAsync(async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id }).select('-__v');
    res.status(StatusCodes.OK).json(
      successResponse(StatusCodes.OK, 'Files retrieved successfully', { files })
    );
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(
      errorResponse(StatusCodes.BAD_REQUEST, err.message)
    );
  }
});

// Download File
exports.downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user._id; // ensure this is set in your auth middleware

    const file = await File.findOne({ _id: fileId, user: userId });

    if (!file) {
      return res.status(StatusCodes.NOT_FOUND).json(
        errorResponse(StatusCodes.NOT_FOUND, 'File not found in DB')
      );
    }

    // Absolute path to file (ensure it works cross-platform)
    const absoluteFilePath = path.resolve(file.path); // e.g., src/uploads/filename.pdf

    // Check if file physically exists on disk
    if (!fs.existsSync(absoluteFilePath)) {
      return res.status(StatusCodes.NOT_FOUND).json(
        errorResponse(StatusCodes.NOT_FOUND, 'File not found on server')
      );
    }

    // Download the file with original name
    res.download(absoluteFilePath, file.originalname, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
          errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'Error during file download')
        );
      }
    });
  } catch (error) {
    console.error('Download controller error:', error);
    return res.status(StatusCodes.BAD_REQUEST).json(
      errorResponse(StatusCodes.BAD_REQUEST, error.message)
    );
  }
};

// Delete File
exports.deleteFile = catchAsync(async (req, res) => {
  try {
    const file = await File.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!file) {
      return res.status(StatusCodes.NOT_FOUND).json(
        errorResponse(StatusCodes.NOT_FOUND, 'File not found')
      );
    }

    const filePath = path.join(__dirname, '../', file.path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(StatusCodes.OK).json(
      successResponse(StatusCodes.OK, 'File deleted successfully')
    );
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      errorResponse(StatusCodes.BAD_REQUEST, err.message)
    );
  }
});
