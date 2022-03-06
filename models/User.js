import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  cv: {
    type: String,
    trim: true,
    maxlength: 50,
    default: "my cv",
  },
  workExp: [{ jobTitle: String, company: String, dateStarted: Date, industry: ["Hospitality", "Engineering", "Others"] }],

  education: [{ highestLevel: String, school: String, dateCompleted: Date, industry: ["Hospitality", "Engineering", "Others"] }],

  skills: {
    type: String,
    trim: true,
    maxlength: 50,
    default: "my cv",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
