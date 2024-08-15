import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Create a unique filename
  }
});


// Handle file uploads
export const uploadFiles = (req, res) => {
  try {
    // Access files from req.files
    const image = req.files['image'] ? req.files['image'][0].path : null;
    const textFile = req.files['text'] ? req.files['text'][0].path : null;

    // Return file paths and other data
    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      filePaths: {
        image,
        text: textFile
      },
      body: req.body // Include other form data if needed
    });
  } catch (error) {
    console.error('Error uploading files:', error); // Log error for debugging
    res.status(500).json({ success: false, message: 'Error uploading files', error: error.message });
  }
};
export default router;
