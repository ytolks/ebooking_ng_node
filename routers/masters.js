const { Master } = require("../models/master");
const express = require("express");
const router = express.Router();

//GET the list of masters
router.get(`/`, async (request, response) => {
  const masterList = await Master.find(); // find method returning a PROMISE when response is send list maynot be ready, so use of await needed
  if (!masterList) {
    response.status(500).json({ success: false });
  }
  response.status(200).send(masterList);
});

//GET one master by Id
router.get(`/:id`, async (request, response) => {
  const master = await Master.findById(request.params.id);
  if (master) {
    response.status(200).send(master);
  } else {
    response.status(400).json({ message: "Master by id not found" });
  }
});

//POST/add master to db

router.post(`/`, async (request, response) => {
  let master = new Master({
    name: request.body.name,
  });
  master = await master.save(); //waiting until master is ready

  if (!master) {
    return response.status(404).send("the master cannot be created");
  }
  response.send(master);
});

//deleting master by id from db

router.delete(`/:id`, (request, response) => {
  Master.findByIdAndRemove(request.params.id)

    .then((master) => {
      if (master) {
        return response
          .status(200)
          .json({ success: true, message: "master deleted successfuly" });
      } else {
        return response
          .status(404)
          .json({ success: false, mesage: "master was not found" });
      }
    })
    //connection error to send to the user
    .catch((err) => {
      return response.status(400).json({ success: false, error: err });
    });
});

//Update master
router.put("/:id", async (request, response) => {
  const master = await Master.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
    },
    {
      new: true, //to update instantly request/response
    }
  );
  if (!master) {
    return response.status(400).send("master can not be updated");
  }
  response.status(200).send(master);
});

module.exports = router;
