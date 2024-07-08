import mongoose from "mongoose";

// Connect to MongoDB

const LoginSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Login = mongoose.model("loginauth", LoginSchema);
