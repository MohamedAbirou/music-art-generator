import express from "express";
import loginLimiter from "../middleware/loginLimiter";
import { login, logout, validateToken } from "../controllers/authController";
import verifyToken from "../middleware/auth";
import { checkSchema } from "express-validator";
import { userLoginValidationSchema } from "../utils/validationSchemas";

const router = express.Router();

router
  .route("/login")
  .post(loginLimiter, checkSchema(userLoginValidationSchema), login);

router.route("/validate-token").get(verifyToken, validateToken);

router.route("/logout").post(verifyToken, logout);

export default router;
