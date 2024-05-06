import { UserRole } from "../models/user";

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type AccountType = {
  _id: string;
  email: string;
  googleId: string;
};
