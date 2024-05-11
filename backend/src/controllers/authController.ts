import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import "dotenv/config";
import User from "../models/user";

declare global {
  namespace Express {
    interface User {
      id: string;
    }

    interface Request {
      user?: User;
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

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

    if (user.sessionId) {
      req.sessionStore.destroy(user.sessionId, (err) => {
        if (err) {
          console.log("Error destroying old session:", err);
        }
      });
    }

    // Store user ID in the session
    req.session.userId = user.id;

    // Store the new session ID in the user document
    user.sessionId = req.sessionID;

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token_cookie", token, {
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

const googleLogin = (req: Request, res: Response) => {
  // User is authenticated with Google, create a new session
  req.session.userId = req.user?.id;

  // User is authenticated with Google, create JWT token
  const token = jwt.sign(
    { userId: req.user?.id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  // Set JWT token as cookie
  res.cookie("auth_token_cookie", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Successful authentication,
  res.redirect("/");
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

const checkSessionRoute = (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Could not log out, please try again." });
    }

    res.clearCookie("auth_token_cookie"); // Clear the auth_token cookie
    res.clearCookie("session_cookie"); // Clear the session_cookie
    res.send();
  });
};

export { login, googleLogin, logout, validateToken, checkSessionRoute };
