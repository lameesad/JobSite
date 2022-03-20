import Application from "../models/Application.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import mongoose from "mongoose";
import moment from "moment";
import Job from "../models/Job.js";

const applyJob = async (req, res) => {
  const { job: jobId } = req.body;
  const isValidJob = await Job.findOne({ _id: jobId });
  if (!isValidJob) {
    throw new CustomError.NotFoundError(`No Job with id : ${jobId}`);
  }

  const alreadySubmitted = await Application.findOne({
    job: jobId,
    user: req.user.userId,
  });
  console.log("AlreadySubmitteddd", alreadySubmitted);
  if (alreadySubmitted) {
    throw new BadRequestError("Already submitted Application for this job");
  }

  req.body.user = req.user.userId;
  const application = await Application.create(req.body);
  console.log(application);
  res.status(StatusCodes.CREATED).json({ application });
};

// const getJobApplicants = async (req, res) => {
//   const { jobId: jobId } = req.params;
//   const applications = await Application.find({ job: jobId }).populate({
//     path: "user",
//     select: "userId name",
//   });

//   res.status(StatusCodes.OK).json({ applications, count: applications.length });
// };

const getJobApplicants = async (req, res) => {
  const { jobId: jobId } = req.params;

  const applications = await Application.find({ job: jobId });

  if (!applications) {
    throw new CustomError.NotFoundError(`No application with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ applications, count: applications.length });
};

export { applyJob, getJobApplicants };
