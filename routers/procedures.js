const { Procedure } = require("../models/procedure");
const { Master } = require("../models/master");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//GET procedureList with async await
router.get(`/`, async (req, res) => {
  const procedureList = await Procedure.find().populate("master"); // find method returning a PROMISE when response is send list maynot be ready, so use of await needed
  if (!procedureList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(procedureList);
});

//GET procedure by ID without async await
router.get(`/:id`, (request, response) => {
  Procedure.findById(request.params.id)
    .populate("master")

    .then((procedure) => {
      if (procedure) {
        return response.status(200).send(procedure);
      } else {
        return response
          .status(400)
          .json({ success: false, mesage: "procedure was not found" });
      }
    })

    .catch((err) => {
      return response.status(500).json({ success: false, error: err });
    });
});

//POST method to the server with async await
router.post(`/`, async (request, response) => {
  if (mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).send("invalid procedure ID");
  }
  const master = await Master.findById(request.body.master);
  if (!master) {
    return response.status(400).send("invalid master");
  }

  let procedure = new Procedure({
    procedure_name: request.body.procedure_name,
    description: request.body.description,
    price: request.body.price,
    master: request.body.master,
  });

  procedure = await procedure.save();

  if (!procedure) {
    return response
      .status(500)
      .send({ message: "procedure cannot be created" });
  }
  response.status(200).send(procedure);
});

//UPDATE procedure
router.put("/:id", async (request, response) => {
  if (mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).send("invalid procedure ID");
  }
  const procedure = await Procedure.findByIdAndUpdate(
    request.params.id,
    {
      procedure_name: request.body.procedure_name,
      description: request.body.description,
      price: request.body.price,
    },
    {
      new: true,
    }
  );
  if (!procedure) {
    return response.status(400).send("procedure can not be updated");
  }
  response.status(200).send(procedure);
});

//Remove procedure
router.delete(`/:id`, (request, response) => {
  Procedure.findByIdAndRemove(request.params.id)
    .then((procedure) => {
      if (procedure) {
        return response
          .status(200)
          .json({ success: true, message: "procedure deleted successfuly" });
      } else {
        return response
          .status(404)
          .json({ success: false, mesage: "procedure was not found" });
      }
    })
    .catch((err) => {
      return response.status(500).json({ success: false, error: err });
    });
});

//count amount of procedures for admin
router.get(`/get/count`, async (request, response) => {
  const procedureAmount = await Procedure.countDocuments();

  if (!procedureAmount) {
    response.status(500).json({ success: false });
  }
  response.status(200).send({
    procedureAmount: procedureAmount,
  });
});

module.exports = router;
