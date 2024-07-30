import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Initialize dotenv to load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");

    // Start the Express server only after successful connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
