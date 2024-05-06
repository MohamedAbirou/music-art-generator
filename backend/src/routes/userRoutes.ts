import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
} from "../controllers/usersController";
import verifyToken from "../middleware/auth";
import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas";

const router = express.Router();

router.route("/me").get(verifyToken, getCurrentUser);

router
  .route("/register")
  .post(checkSchema(createUserValidationSchema), createNewUser);

router.route("/getAllUsers").get(verifyToken, getAllUsers);

router.route("/update").patch(verifyToken, updateUser);

router.route("/delete").delete(verifyToken, deleteUser);

export default router;
