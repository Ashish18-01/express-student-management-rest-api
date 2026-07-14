require("dotenv").config();


const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Database
const connectDB = require("./config/db");

// Custom middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// Routes
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth.routes");

const app = express();

const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-party middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Custom middleware
app.use(logger);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Student Management REST API",
        version: "2.0.0"
    });
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        time: new Date()
    });
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/users", userRoutes);

// 404 middleware
app.use(notFound);

// Error middleware-
app.use(errorHandler);

// Connect database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`
        ============================
        Server Running Successfully
        http://localhost:${PORT}
        ============================
    `);
});