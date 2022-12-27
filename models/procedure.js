const mongoose = require("mongoose");

//creating mongodb schema
const proceduresSchema = mongoose.Schema({
  procedure_name: String,

  description: String,
  master: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// creating model
exports.Procedure = mongoose.model("Procedure", proceduresSchema);
