import { Router } from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/user.controller.js";
import { forgotPassword, resetPassword } from "../controllers/forgotPassword.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);

export default router;
 