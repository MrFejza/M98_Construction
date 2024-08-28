import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

// Function to handle user signup
export const signup = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body; // Added isAdmin
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, isAdmin });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// Function to handle user signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).json({ access_token: token, success: true, ...rest });
  } catch (error) {
    console.error("Signin error:", error); // Log specific signin errors
    next(errorHandler(500, 'Internal Server Error'));
  }
};


// Function to check if the user is an admin
export const checkAdmin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.isAdmin) {
      return res.json({ isAdmin: true });
    } else {
      return res.json({ isAdmin: false });
    }
  } catch (err) {
    console.error('Error checking admin status:', err);
    return next(errorHandler(500, 'Internal Server Error'));
  }
};
