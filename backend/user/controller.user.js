import admin from "../config/firebase.cjs";
import User from "./model.user.js";

export const currentUser = async (req, res) => {
    try {
      const currentUser = req.currentUser;
      if (!currentUser) {
        return res.status(401).json({
          error: "Unauthorized. User does not exist.",
        });
      }
      return res.status(200).json(currentUser);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong. Please try again.",
        msg: err.message,
      });
    }
  };
  

export const login = async (req, res) => {
  try {
    const currentUser = req.currentUser;
    if (!currentUser) {
      return res.status(401).json({
        error: "Unauthorized. User does not exist.",
      });
    }
    return res.status(200).json(currentUser);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
      msg: err.message,
    });
  }
};

export const register = async (req, res) => {
    try {
      const currentUser = req.currentUser;
      if (!currentUser) {
        return res.status(401).json({
          error: "Unauthorized. User does not exist.",
        });
      }
      return res.status(200).json(currentUser);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong. Please try again.",
        msg: err.message,
      });
    }
  };
  

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
  console.log("users");
};
