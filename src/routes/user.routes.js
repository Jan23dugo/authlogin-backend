import { Router } from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email").post(verifyEmail);

export default router;
