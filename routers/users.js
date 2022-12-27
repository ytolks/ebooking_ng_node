const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//GET list of users
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash"); // find method returning a PROMISE when response is send list maynot be ready, so use of await needed
  if (userList == null) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

//GET one user by ID
router.get(`/:id`, async (request, response) => {
  const user = await User.findById(request.params.id).select("-passwordHash");
  if (user) {
    response.status(200).send(user);
  } else {
    response.status(400).json({ message: "Master by id not found" });
  }
});

//POST  new user
router.post(`/`, async (request, response) => {
  let user = new User({
    name: request.body.name,
    email: request.body.email,
    telephone_number: request.body.telephone_number,
    passwordHash: bcrypt.hashSync(request.body.password, 10),
    isAdmin: request.body.isAdmin,
  });
  user = await user.save(); //waiting until master is ready

  if (!user) {
    return response.status(400).send("the master cannot be created");
  }
  response.send(user);
});

//person can send his email and password to the server + jwt
router.post("/login", async (request, response) => {
  const secret = process.env.secret;
  const user = await User.findOne({
    email: request.body.email,
  });

  if (!user) {
    response.status(400).send("user not found");
  }

  if (user && bcrypt.compareSync(request.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      secret
    );
    response.status(200).send({ user: user.email, token: token });
  } else {
    response.status(401).send("unauthorized user");
  }
});

module.exports = router;
