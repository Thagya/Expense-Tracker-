require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path= require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


const app = express();

//Middleware and handle CORS 
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());
 connectDB();
 app.use ("/api/v1/auth",authRoutes);

// Parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>  {
    console.log(`Server is running on port ${PORT}`);
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static())