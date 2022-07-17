const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  // every category has a name
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
