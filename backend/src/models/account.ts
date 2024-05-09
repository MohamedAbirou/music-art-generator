import mongoose from "mongoose";
import { AccountType } from "../shared/types";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
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
  picture: String,
  provider: String,
  providerAccountId: String,
  refreshToken: String,
  accessToken: String,
  expiresAt: Number,
});

const Account = mongoose.model<AccountType>("Account", accountSchema);

export default Account;
