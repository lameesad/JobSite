import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import { register, login, updateUser, logout } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authentication.js";
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/logout").get(apiLimiter, logout);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
