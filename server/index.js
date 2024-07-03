import express, { urlencoded, json } from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Set up CORS to allow requests from your frontend client
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type"],
  })
);

// Middleware to parse JSON request bodies
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.use("/books", bookRoutes);

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with an error code of 1 in case of failure.
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
