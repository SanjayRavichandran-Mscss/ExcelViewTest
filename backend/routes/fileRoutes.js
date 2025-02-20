// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const { uploadFile, getFiles, openFile, downloadFile } = require("../controllers/fileController");

// const router = express.Router();

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // Save with exact file name
//     },
// });

// const upload = multer({ storage });

// // Routes
// router.post("/upload", upload.single("file"), uploadFile);
// router.get("/list", getFiles);
// router.get("/open/:fileName", openFile);
// router.get("/download/:fileName", downloadFile);

// module.exports = router;






















const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// Upload File
router.post("/upload", fileController.uploadFile);

// Get All Uploaded Files
router.get("/", fileController.getFiles);

// Download File
router.get("/download/:filename", fileController.downloadFile);

// Open File in MS Excel (Backend Approach)
router.get("/open/:filename", fileController.openFile);

module.exports = router;

