import { useState, useEffect } from "react";
import axios from "axios";

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/files/list");
            setFiles(response.data);
        } catch (error) {
            alert("Error fetching files");
        }
    };

    const handleEdit = async (fileName) => {
        try {
            await axios.get(`http://localhost:5000/api/files/open/${fileName}`);
        } catch (error) {
            alert("Error opening file");
        }
    };

    const handleDownload = async (fileName) => {
        window.open(`http://localhost:5000/api/files/download/${fileName}`, "_blank");
    };

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file} 
                        <button onClick={() => handleEdit(file)}>Edit</button>
                        <button onClick={() => handleDownload(file)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
