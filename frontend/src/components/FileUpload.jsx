import { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:5000/api/files/upload", formData);
            alert("File uploaded successfully!");
            onUploadSuccess();
        } catch (error) {
            alert("Error uploading file");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
