// const express = require("express");
// const cors = require("cors");
// const fileRoutes = require("./routes/fileRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // Serve static files

// app.use("/api/files", fileRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

















const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

// Configure CORS to accept requests from your Netlify frontend
app.use(
  cors({
    origin: "https://fancy-dodol-c2863b.netlify.app", // Allow only your Netlify frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());

// API Routes
app.use("/api/files", fileRoutes);

// Serve static files from uploads folder
app.use("/uploads", express.static("uploads"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));










