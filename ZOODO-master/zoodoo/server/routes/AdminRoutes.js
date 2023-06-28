const express = require("express");
const Admin = require("../models/AdminModel");

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  //check if user exists
  const requestedUser = await Admin.findOne({ email });

  if (!requestedUser) {
    return res.status(400).json({ message: "admin does not exist..." });
  }

  //check if password is correct

  if (password !== requestedUser.password) {
    return res.status(400).json({ message: "incorrect password" });
  }

  res.json({
    email: requestedUser.email,
    user: requestedUser._id,
  });
});

module.exports = adminRouter;
