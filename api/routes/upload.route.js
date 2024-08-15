import path from 'path';
import express from 'express';
import multer from 'multer';
import { uploadFiles } from '../controllers/upload.controller.js'; // Import your new controller

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads'); // Ensure 'uploads' is the correct folder
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|txt/;
  const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp|text\/plain/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Files must be of type: jpg, jpeg, png, webp, txt'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Handle file uploads
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'text', maxCount: 1 }]), (req, res) => {
  const filePaths = {
    image: req.files['image'] ? req.files['image'][0].path : null,
    text: req.files['text'] ? req.files['text'][0].path : null,
  };
  res.status(200).send({
    message: 'Files uploaded successfully',
    filePaths,
  });
});

export default router;
