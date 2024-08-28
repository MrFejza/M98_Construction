import express from "express";
import { signin, signup, checkAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

// Route for user signin
router.post('/signin', signin);

// Route to check if the user is an admin
router.post('/check-admin', checkAdmin, (req, res) => {
  res.json({ isAdmin: req.user.isAdmin });
});

export default router;
