const express = require("express");
const BuyHistory = require("../models/BuyHistory");

const buyHistoryRoute = express.Router();

buyHistoryRoute.post("/add", async (req, res) => {
  const { foodID, UserID } = req.body;

  //create a new user
  const newBuyHistory = new BuyHistory({
    foodID,
    UserID,
  });
  await newBuyHistory.save();
  //response
  res.status(201).json({ message: "history recorded" });
});

//get buying history for a user
buyHistoryRoute.get("/", async (req, res) => {
  const userID = req.query.UserID;
  try {
    const buyHistory = await BuyHistory.find({ UserID: userID });
    res.status(200).json(buyHistory);
  } catch (error) {
    res.status(400).json({ message: "cannot retrieve data" });
  }
});

module.exports = buyHistoryRoute;
