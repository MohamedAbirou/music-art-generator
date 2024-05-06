import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import "dotenv/config";

// @desc Login
// @route POST /auth
// @access Public
const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const validateToken = (req: Request, res: Response) => {
  // Check if userId is present in the request indicating authentication
  if (req.userId) {
    // User is authenticated, send back user information or success message
    return res.status(200).json({ userId: req.userId });
  } else {
    // User is not authenticated, send unauthorized status
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Unauthorized" });
  }
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "Logged out successfully" });
};

export { login, logout, validateToken };
