import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "applied", // when a applicant is applied
        "shortlisted", // when a applicant is shortlisted
        "accepted", // when a applicant is accepted
        "rejected", // when a applicant is rejected
        "deleted", // when any job is deleted
        "cancelled", // an application is cancelled by its author or when other application is accepted
        "finished", // when job is over
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ job: 1, user: 1 }, { unique: true });

export default mongoose.model("Application", ApplicationSchema);
