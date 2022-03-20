import express from "express";
const router = express.Router();
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";
import { applyJob, getJobApplicants } from "../controllers/appController.js";

router
  .route("/:id/applications")
  .get(authenticateUser, getJobApplicants)
  .post(authenticateUser, applyJob);

export default router;
