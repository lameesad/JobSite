import express from "express";
const router = express.Router();
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from "../controllers/jobsController.js";

router.route("/").post(authenticateUser, authorizePermissions("admin"), createJob).get(authenticateUser, authorizePermissions("admin"), getAllJobs);
// remember about :id
router.route("/stats").get(authenticateUser, authorizePermissions("admin"), showStats);
router.route("/:id").delete(authenticateUser, authorizePermissions("admin"), deleteJob).patch(authenticateUser, authorizePermissions("admin"), updateJob);

export default router;
