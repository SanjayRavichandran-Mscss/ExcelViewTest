const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadFile, getFiles, openFile, downloadFile } = require("../controllers/fileController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Save with exact file name
    },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/list", getFiles);
router.get("/open/:fileName", openFile);
router.get("/download/:fileName", downloadFile);

module.exports = router;
