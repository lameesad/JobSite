import Application from "../models/Application.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import mongoose from "mongoose";
import moment from "moment";
import Job from "../models/Job.js";

// const applyJob = async (req, res) => {
//   const user = req.user;
//   if (user.type == "admin") {
//     res.status(401).json({
//       message: "You don't have permissions to apply for a job",
//     });
//     return;
//   }
//   const data = req.body;
//   const jobId = req.params.id;

//   // check whether applied previously
//   // find a job
//   // store the data in applications

//   Application.findOne({
//     userId: user._id,
//     jobId: jobId,
//     status: {
//       $nin: ["deleted", "accepted", "cancelled"],
//     },
//   }).then((appliedApplication) => {
//     console.log(appliedApplication);
//     if (appliedApplication !== null) {
//       res.status(400).json({
//         message: "You have already applied for this job",
//       });
//       return;
//     }

//     Job.findOne({ _id: jobId })
//       .then((job) => {
//         if (job === null) {
//           res.status(404).json({
//             message: "Job does not exist",
//           });
//           return;
//         }
//         const application = new Application({
//           userId: user._id,
//           jobId: job._id,
//           status: "applied",
//         });
//         application
//           .save()
//           .then(() => {
//             res.json({
//               message: "Job application successful",
//             });
//           })

//           .catch((err) => {
//             res.status(400).json(err);
//           });
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });
// };

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

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError("Already submitted Application for this job");
  }

  req.body.user = req.user.userId;
  const application = await Application.create(req.body);
  res.status(StatusCodes.CREATED).json({ application });
};

const getJobApplicants = async (req, res) => {
  const applications = await Application.find({}).populate({
    path: "job user",
    select: "userId name",
  });

  res.status(StatusCodes.OK).json({ applications, count: applications.length });
};

export { applyJob, getJobApplicants };
