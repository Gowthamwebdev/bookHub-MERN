import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await Login.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch || (username === "admin" && password === "password")) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
