import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
} from "../controllers/usersController";
import { checkSession, verifyToken } from "../middleware/auth";
import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas";

const router = express.Router();

router.route("/me").get(verifyToken, checkSession, getCurrentUser);

router
  .route("/register")
  .post(checkSchema(createUserValidationSchema), createNewUser);

router.route("/getAllUsers").get(verifyToken, checkSession, getAllUsers);

router.route("/update").patch(verifyToken, checkSession, updateUser);

router.route("/delete").delete(verifyToken, checkSession, deleteUser);

export default router;
