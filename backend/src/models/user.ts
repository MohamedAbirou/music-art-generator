import mongoose from "mongoose";
import { UserType } from "../shared/types";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  sessionId: {
    type: String,
    default: null,
  },
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
