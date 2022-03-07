import express from "express";
const router = express.Router();
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";
import { applyJob, getJobApplicants } from "../controllers/appController.js";

router.route("/:id/applications").get(authenticateUser, authorizePermissions("admin"), getJobApplicants).post(authenticateUser, authorizePermissions("user"), applyJob);

export default router;
