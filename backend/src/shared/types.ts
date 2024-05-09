import { UserRole } from "../models/user";

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  picture?: string;
  role: UserRole;
};

export type AccountType = {
  _id: string;
  googleId: string;
  userId: string;
  email: string;
  provider: String;
  providerAccountId: String;
  refreshToken: String;
  accessToken: String;
  expiresAt: Number;
};
