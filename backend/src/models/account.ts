import mongoose from "mongoose";
import { AccountType } from "../shared/types";

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    // Validate email format using a regular expression
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Account = mongoose.model<AccountType>("Account", AccountSchema);

export default Account;
