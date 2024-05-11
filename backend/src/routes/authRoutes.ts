import express from "express";
import loginLimiter from "../middleware/loginLimiter";
import {
  googleLogin,
  login,
  logout,
  validateToken,
  checkSessionRoute,
} from "../controllers/authController";
import { checkSession, verifyToken } from "../middleware/auth";
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

router.route("/check-session").get(checkSession, checkSessionRoute);

router.route("/logout").post(verifyToken, checkSession, logout);

export default router;
