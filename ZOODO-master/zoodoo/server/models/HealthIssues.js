const mongoose = require("mongoose");

const schema = mongoose.Schema;

var healthIssueSchema = new schema({
  foodName: {
    type: String,
    required: true,
  },
  healthIssues: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HealthIssues", healthIssueSchema);
