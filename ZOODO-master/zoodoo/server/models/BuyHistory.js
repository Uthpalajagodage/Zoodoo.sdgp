const mongoose = require("mongoose");

const schema = mongoose.Schema;

const buyHistory = new schema({
  foodID: {
    type: String,
    required: true,
  },
  UserID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BuyHistory", buyHistory);
