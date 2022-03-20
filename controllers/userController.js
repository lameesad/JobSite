import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { createTokenUser, attachCookiesToResponse, checkPermissions } from "../utils/index.js";
import path from "path";

const getAllUsers = async (req, res) => {
  const { email, education, jobTitle, skills, industry, highestLevel, search } = req.query;
  const queryObject = {
    // createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  if (email) {
    queryObject.email = { $regex: email, $options: "i" };
  }

  if (education) {
    queryObject.education = { $regex: education, $options: "i" };
  }

  if (jobTitle) {
    queryObject.jobTitle = { $regex: jobTitle, $options: "i" };
  }

  if (skills) {
    queryObject.skills = { $regex: skills, $options: "i" };
  }

  if (industry) {
    queryObject.industry = { $regex: industry, $options: "i" };
  }

  if (highestLevel) {
    queryObject.highestLevel = { $regex: highestLevel, $options: "i" };
  }
  // NO AWAIT

  let result = User.find(queryObject);

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await result;
  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);
  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
// update user with user.save()
const updateUser = async (req, res) => {
  const { email, name, lastName, cv } = req.body;
  if (!email || !name || !lastName || !cv) {
    // console.log(email, name, lastName, cv);
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.cv = cv;

  await user.save();

  const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const uploadCv = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file Uploaded");
  }
  const cvFile = req.files.cvFile;
  const maxSize = 1024 * 1024;

  if (cvFile.size > maxSize) {
    throw new BadRequestError("Please upload file smaller than 1MB");
  }
  const cvFilePath = path.join("public/uploads/" + `${cvFile.name}`);
  await cvFile.mv(cvFilePath);
  res.status(StatusCodes.OK).json({ cvFile: `/uploads/${cvFile.name}` });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

export { getAllUsers, getSingleUser, showCurrentUser, updateUser, uploadCv, updateUserPassword };
