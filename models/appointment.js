const mongoose = require("mongoose");

//creating mongodb schema
const appointmentsSchema = mongoose.Schema({
  appDate: Date,
});

//creating model
exports.Appointment = mongoose.model("Appointment", appointmentsSchema);
