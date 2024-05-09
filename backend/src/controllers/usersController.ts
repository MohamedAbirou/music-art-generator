import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import "dotenv/config";

// @desc Get current user
// @route GET /users/me
// @access Private
const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// @desc Get all users
// @route GET /users/getAllUsers
// @access Private
const getAllUsers = async (req: Request, res: Response) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @desc Create new user
// @route POST /users/register
// @access Private
const createNewUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const { fullName, email, password } = req.body;

    // Confirm data
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate email
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = { fullName, email, password: hashedPwd };

    // Create and store new user
    user = new User(userObject);
    await user.save();

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

    return res.status(200).send({ message: "User registered OK" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

// @desc Update a user
// @route PATCH /users/update
// @access Private
const updateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, password } = req.body;

  // Confirm data
  if (!id || !fullName || !email) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.fullName = fullName;
  user.email = email;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.fullName} updated` });
};

// @desc Delete a user
// @route DELETE /users/delete
// @access Private
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  await user.deleteOne();

  const reply = `User deleted successfully!`;

  res.json(reply);
};

export { getCurrentUser, getAllUsers, createNewUser, updateUser, deleteUser };
