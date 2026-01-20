import { Router } from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/user.controller.js";
import { forgotPassword, resetPassword } from "../controllers/forgotPassword.controller.js";
import { disableTwoFactor, setupTwoFactor, verifyTwoFactor } from "../controllers/twoFactor.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);

router.route("/2fa/setup").post(protect, setupTwoFactor);
router.route("/2fa/verify").post(protect, verifyTwoFactor);
router.route("/2fa/disable").post(protect, disableTwoFactor);

export default router;
 