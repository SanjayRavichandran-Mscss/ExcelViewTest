// import { useState, useEffect } from "react";
// import axios from "axios";

// const FileList = () => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     const fetchFiles = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/files/list");
//             setFiles(response.data);
//         } catch (error) {
//             alert("Error fetching files");
//         }
//     };

//     const handleEdit = async (fileName) => {
//         try {
//             await axios.get(`http://localhost:5000/api/files/open/${fileName}`);
//         } catch (error) {
//             alert("Error opening file");
//         }
//     };

//     const handleDownload = async (fileName) => {
//         window.open(`http://localhost:5000/api/files/download/${fileName}`, "_blank");
//     };

//     return (
//         <div>
//             <h2>Uploaded Files</h2>
//             <ul>
//                 {files.map((file, index) => (
//                     <li key={index}>
//                         {file} 
//                         <button onClick={() => handleEdit(file)}>Edit</button>
//                         <button onClick={() => handleDownload(file)}>Download</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FileList;









// import { useState, useEffect } from "react";
// import axios from "axios";

// const FileList = () => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     const fetchFiles = async () => {
//         try {
//             // const res = await axios.get("http://localhost:5000/api/files"); // Ensure this is correct
//             const res = await axios.get("https://excelviewtest.onrender.com/api/files"); // Ensure this is correct
//             setFiles(res.data);
//         } catch (error) {
//             console.error("Failed to fetch files", error);
//         }
//     };

//     const handleEdit = async (fileName) => {
//         try {
//             // await axios.get(`http://localhost:5000/api/files/open/${fileName}`);
//             await axios.get(`https://excelviewtest.onrender.com/api/files/open/${fileName}`);
//         } catch (error) {
//             console.error("Error opening file:", error);
//         }
//     };

//     const handleDownload = async (fileName) => {
//         const link = document.createElement("a");
//         // link.href = `http://localhost:5000/uploads/${fileName}`;
//         // link.href = `http://192.168.252.225:5000/uploads/${fileName}`;
//         link.href = `https://excelviewtest.onrender.com/uploads/${fileName}`;
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <div>
//             <h2>Uploaded Files</h2>
//             {files.length === 0 ? <p>No files uploaded</p> : (
//                 files.map((file, index) => (
//                     <div key={index}>
//                         <span>{file}</span>
//                         <button onClick={() => handleEdit(file)}>Edit</button>
//                         <button onClick={() => handleDownload(file)}>Download</button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default FileList;















import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://excelviewtest.onrender.com/api/files"; // Backend API

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleEdit = (fileName) => {
        // Open the file from frontend "public/uploads"
        const frontendFilePath = `/uploads/${fileName}`;
        window.open(frontendFilePath, "_blank");
    };

    const handleDownload = async (fileName) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/download/${fileName}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div>
            <h2>Uploaded Excel Files</h2>
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
