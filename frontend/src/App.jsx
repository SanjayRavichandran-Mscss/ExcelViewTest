// import FileUpload from "./components/FileUpload";
// import FileList from "./components/FileList";

// const App = () => {
//     return (
//         <div>
            
//             <FileUpload onUploadSuccess={() => window.location.reload()} />
//             <FileList />
//         </div>
//     );
// };

// export default App;















import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

const App = () => {
    return (
        <div>
            <h1>Excel File Manager</h1>
            <FileUpload />
            <FileList />
        </div>
    );
};

export default App;
