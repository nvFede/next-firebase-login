import express from "express";
const router = express.Router();

import {
  register,
  login,
  getAllUsers,
  currentUser,
} from "./controller.user.js";
import {
  authCheck,
  registerCheck,
  preventAdminCreation,
} from "./middleware.user.js";

router.post("/auth/login", preventAdminCreation, authCheck, currentUser);
router.post("/auth/register", registerCheck, currentUser);

router.get("/", getAllUsers);

router.get("/protected", (req, res) => {
  res.send("Hello, from protected route!");
});

export default router;
