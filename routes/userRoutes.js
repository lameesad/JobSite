import express from "express";
const router = express.Router();

import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  uploadCv,
  updateUserPassword,
} from "../controllers/userController.js";

// const MIME_TYPE_MAP = {
//   "application/pdf": "pdf",
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(null, "backend/files");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(" ").join("-");
//     const ext = MIME_TYPE_MAP(file.mimetype);
//     cb(null, name + "-" + Date.now() + "." + ext);
//   },
// });

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/uploadCv").post(uploadCv);

router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
