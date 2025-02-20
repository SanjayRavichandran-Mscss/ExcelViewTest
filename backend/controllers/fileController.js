// const path = require("path");
// const { exec } = require("child_process");
// const fs = require("fs");

// // Upload File
// const uploadFile = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//     }
//     res.json({ message: "File uploaded successfully", fileName: req.file.filename });
// };

// // Fetch Uploaded Files
// const getFiles = (req, res) => {
//     const uploadDir = path.join(__dirname, "../uploads");

//     fs.readdir(uploadDir, (err, files) => {
//         if (err) {
//             return res.status(500).json({ message: "Error reading files" });
//         }
//         res.json(files);
//     });
// };

// // Open File in Excel
// const openFile = (req, res) => {
//     const filePath = path.join(__dirname, "../uploads", req.params.fileName);

//     let command;
//     if (process.platform === "win32") {
//         command = `start excel "${filePath}"`;  // Windows
//     } else if (process.platform === "darwin") {
//         command = `open -a "Microsoft Excel" "${filePath}"`;  // macOS
//     } else {
//         command = `xdg-open "${filePath}"`;  // Linux
//     }

//     exec(command, (error) => {
//         if (error) {
//             console.error("Error opening file:", error);
//             return res.status(500).json({ message: "Failed to open file", error: error.message });
//         }
//         res.json({ message: "File opened successfully" });
//     });
// };

// // Download File
// const downloadFile = (req, res) => {
//     const filePath = path.join(__dirname, "../uploads", req.params.fileName);
//     res.download(filePath);
// };

// module.exports = { uploadFile, getFiles, openFile, downloadFile };



































const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const multer = require("multer");

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Save with exact filename
    }
});

const upload = multer({ storage }).single("file");

// ✅ 1. Upload File API
exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: "File upload failed" });
        }

        // Copy file from backend to frontend uploads folder
        const backendPath = path.join(__dirname, "../uploads", req.file.originalname);
        const frontendPath = path.join(__dirname, "../../frontend/uploads", req.file.originalname);

        fs.copyFile(backendPath, frontendPath, (copyErr) => {
            if (copyErr) {
                console.error("File copy failed:", copyErr);
                return res.status(500).json({ message: "File copied failed!" });
            }
            res.json({ message: "File uploaded & copied successfully!" });
        });
    });
};

// ✅ 2. Get List of Uploaded Files API
exports.getFiles = (req, res) => {
    const directoryPath = path.join(__dirname, "../uploads");
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Unable to retrieve files" });
        }
        res.json(files);
    });
};

// ✅ 3. Download File API
exports.downloadFile = (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    res.download(filePath);
};

// ✅ 4. Open File in MS Excel (Backend Approach)
exports.openFile = (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    exec(`start "" "${filePath}"`, (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to open file in Excel" });
        }
        res.json({ message: "File opened in Excel" });
    });
};
