const mongoose = require("mongoose");

const schema = mongoose.Schema;

var foodSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Food", foodSchema);
