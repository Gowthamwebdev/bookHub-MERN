import express from "express";
import { Signup } from "../models/signupModel.js";
const app = express();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await Signup.validateAsync(req.body);
    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
});

export default router;
