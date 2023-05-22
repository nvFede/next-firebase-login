import express from "express";
import cors from "cors";
import connectDb from "./config/mongo.js";
import morgan from "morgan";
import userRoutes from "./user/routes.user.js";

// connect the database
connectDb();

const app = express();
const router = express.Router();

// necessary middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use morgan
app.use(morgan("dev"));

// Simple Hello route to test api
app.get("/api/hello", (req, res) => {
  res.send("Hello, from API!");
});

// get all user routes
app.use("/api", userRoutes);

export default app;
