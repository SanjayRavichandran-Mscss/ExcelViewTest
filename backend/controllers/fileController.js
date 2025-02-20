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

const FRONTEND_UPLOADS_PATH = path.resolve(__dirname, "../../frontend/public/uploads"); // Adjust as needed
const BACKEND_UPLOADS_PATH = path.resolve(__dirname, "../uploads");

// Ensure frontend uploads folder exists
if (!fs.existsSync(FRONTEND_UPLOADS_PATH)) {
    fs.mkdirSync(FRONTEND_UPLOADS_PATH, { recursive: true });
}

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const backendFilePath = path.join(BACKEND_UPLOADS_PATH, req.file.filename);
    const frontendFilePath = path.join(FRONTEND_UPLOADS_PATH, req.file.filename);

    // Copy file to frontend uploads folder
    fs.copyFile(backendFilePath, frontendFilePath, (err) => {
        if (err) {
            console.error("Error copying file to frontend:", err);
            return res.status(500).json({ error: "Failed to copy file to frontend" });
        }
        res.json({ message: "File uploaded successfully", fileName: req.file.filename });
    });
};

exports.downloadFile = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(BACKEND_UPLOADS_PATH, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }

    res.download(filePath);
};
