const express = require("express");
const HealthIssues = require("../models/HealthIssues");

const HealthIssuesRoute = express.Router();

HealthIssuesRoute.post("/add", async (req, res) => {
  const { foodName, healthIssues } = req.body;

  //create a new health issue
  const newHealthIssues = new HealthIssues({
    foodName,
    healthIssues,
  });
  await newHealthIssues.save();
  //response
  res.status(201).json({ message: "issues added" });
});

//get health issues
HealthIssuesRoute.get("/:foodname", async (req, res) => {
  const { foodname } = req.params;
  try {
    const healthIssues = await HealthIssues.find({
      foodName: new RegExp(foodname, "i"),
    });
    res.status(200).json(healthIssues);
  } catch (error) {
    res.status(400).json({ message: "cannot retrieve data" });
  }
});

module.exports = HealthIssuesRoute;
