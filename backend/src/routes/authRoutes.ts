import express from "express";
import loginLimiter from "../middleware/loginLimiter";
import {
  googleLogin,
  login,
  logout,
  validateToken,
} from "../controllers/authController";
import verifyToken from "../middleware/auth";
import { checkSchema } from "express-validator";
import { userLoginValidationSchema } from "../utils/validationSchemas";
import passport from "passport";

const router = express.Router();

router
  .route("/login")
  .post(loginLimiter, checkSchema(userLoginValidationSchema), login);

router
  .route("/callback/google")
  .get(
    loginLimiter,
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleLogin
  );

router.route("/validate-token").get(verifyToken, validateToken);

router.route("/logout").post(verifyToken, logout);

export default router;
