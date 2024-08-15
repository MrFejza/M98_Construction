import multer from 'multer';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('uploads')); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}-${file.originalname}`);
  }
});

// Create multer instance
const upload = multer({ storage });

export default upload;