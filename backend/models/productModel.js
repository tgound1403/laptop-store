const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  color: {
    type: Array,
    default: ["black"],
    require: false,
  },
  image: {
    type: String,
    require: true,
  },
  tags: {
    type: Array,
    default: ["office"],
    require: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
