const mongoose = require("mongoose");

//creating mongodb schema
const mastersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//creating model
exports.Master = mongoose.model("Master", mastersSchema);
