const express = require("express");
const Food = require("../models/FoodItem");

const foodRouter = express.Router();

//add a product
foodRouter.post("/addProduct", async (req, res) => {
  const { name, price, description, imageURL } = req.body;

  // check all fields filled or not
  if (!name) {
    res.status(400).json({ message: "name must be filled" });
  } else if (!price) {
    res.status(400).json({ message: "price must be filled" });
  } else if (!description) {
    res.status(400).json({ message: "description must be filled" });
  } else if (!imageURL) {
    res.status(400).json({ message: "imageURL must be filled" });
  }

  const newFood = new Food({
    name,
    price,
    description,
    imageURL,
  });
  await newFood.save();

  res.status(201).json({ message: "product saved successfully" });
});

//get all products
foodRouter.get("/", async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: "cannot retrieve data" });
  }
});

//get a single products
foodRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foodSelected = await Food.findById(id);
    res.status(200).json(foodSelected);
  } catch (error) {
    res.status(400).json({ message: "cannot retrieve data" });
  }
});

module.exports = foodRouter;
