// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const { fileController } = require('../../../controllers');
const auth = require('../../../middlewares/auth.middleware');
const upload = require('../../../config/multer');

router.post('/upload', auth, upload.single('file'), fileController.uploadFile);
router.get('/getalluserfiles', auth, fileController.getUserFiles);
router.get('/downloadfile/:id', auth, fileController.downloadFile);
router.delete('/deletefile/:id', auth, fileController.deleteFile);

module.exports = router;
