import admin from "../config/firebase.cjs";
import User from "./model.user.js";

export const authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
    // Attach firebase user to request object
    let user = await User.findOne({ email: firebaseUser.email });
    req.currentUser = user;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Unable to verify token. Token may be invalid or expired.",
      msg: err.message,
    });
  }
};

export const registerCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
    let user = await User.findOne({ email: firebaseUser.email });
    console.log(firebaseUser.uid);
    if (!user) {
      const name = firebaseUser.name || firebaseUser.email.split("@")[0];
      const photo = firebaseUser.picture || "/avatar.png";
      // const role = "admin";
      user = await new User({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name,
        // role,
        photo,
      }).save();
    }
    req.currentUser = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      err: "Unable to verify token. Token may be invalid or expired.",
    });
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.currentUser) {
      // If the current user is not authenticated, return an error response
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the user has any of the specified roles
    if (!roles.includes(req.currentUser.role)) {
      // If the user doesn't have the required role, return an error response
      return res.status(403).json({ error: "Forbidden" });
    }

    // If the user is authenticated and has the required role, call the next middleware/controller
    next();
  };
};

// Example middleware for preventing creation of admin users
export const preventAdminCreation = (req, res, next) => {
  const { role } = req.body;

  if (role === 'admin') {
    return res.status(400).json({ error: 'Creating admin users is not allowed' });
  }

  next();
};