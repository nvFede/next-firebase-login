import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      //required: true,
    },
    lastname: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      //required: true,
    },
    role: {
      type: String,
      enum: ["user", "editor", "guide", "lead-guide", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
