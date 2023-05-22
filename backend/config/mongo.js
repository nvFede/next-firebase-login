// mongo.js
import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/user-auth";

async function connectDb() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export default connectDb;
