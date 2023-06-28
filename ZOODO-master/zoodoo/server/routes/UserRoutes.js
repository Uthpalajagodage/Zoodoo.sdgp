const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");

const userRouter = express.Router();

//register route
userRouter.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    age,
    height,
    weight,
    createPassword,
    confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !age ||
    !height ||
    !weight ||
    !createPassword ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields must be filleds" });
  }

  //check if the email is valid or not
  const isValidEmial = emailValidator.validate(email);

  if (!isValidEmial) {
    return res
      .status(400)
      .json({ message: "entered email is not a valid email" });
  }

  //check if a user with the same email already exists
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }

  //check if password and confirm password match
  if (createPassword !== confirmPassword) {
    return res.status(400).json({ message: "passwords are not matching" });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(createPassword, 10);

  //create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    age,
    height,
    weight,
    createPassword: hashedPassword,
    confirmPassword: hashedPassword,
  });
  await newUser.save();

  //response
  res
    .status(201)
    .json({ message: `${firstName} ${lastName} successfully signed up` });
});

//login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  //check if user exists
  const requestedUser = await User.findOne({ email });

  if (!requestedUser) {
    return res
      .status(400)
      .json({ message: "user does not exist... Please Register" });
  }

  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    requestedUser.createPassword
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "incorrect password" });
  }

  //create a json web token
  const jsonWebToken = jwt.sign(
    { id: requestedUser._id },
    "secretlkfjdsfjsdhfjcnjknd",
    {
      expiresIn: "3d",
    }
  );

  res.json({
    email: requestedUser.email,
    user: requestedUser._id,
    jsonWebToken,
  });
});

//get all user
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "cannot find a user" });
  }
});

//get a single user
userRouter.get("/:userID", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userID });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "cannot find a user" });
  }
});

module.exports = userRouter;
