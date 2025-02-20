import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

const App = () => {
    return (
        <div>
            
            <FileUpload onUploadSuccess={() => window.location.reload()} />
            <FileList />
        </div>
    );
};

export default App;
