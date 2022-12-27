const { Appointment } = require("../models/appointment");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const appointmentList = await Appointment.find(); // find method returning a PROMISE when response is send list maynot be ready, so use of await needed
  if (appointmentList == null) {
    res.status(500).json({ success: false });
  }
  res.send(appointmentList);
});

module.exports = router;
