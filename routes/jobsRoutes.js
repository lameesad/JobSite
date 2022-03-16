import express from "express";
const router = express.Router();
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

router.route("/").post(authenticateUser, createJob).get(getAllJobs);
// remember about :id
router.route("/stats").get(authenticateUser, showStats);
router.route("/:id").delete(authenticateUser, deleteJob).patch(authenticateUser, updateJob);

export default router;
