//server creation using express library and geting responce from the server :3001
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose"); //lab for all db connections
const cors = require("cors");
require("dotenv/config"); //

app.use(cors());
app.options("*", cors());

//response should be familiar with JSON
app.use(express.json());
app.use(morgan("tiny"));

//Routers
const procedureRouter = require("./routers/procedures");
const userRouter = require("./routers/users");
const appointmentRouter = require("./routers/appointments");
const masterRouter = require("./routers/masters");

const api = process.env.API_URL;

app.use(`${api}/procedures`, procedureRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/masters`, masterRouter);
app.use(`${api}/appointments`, appointmentRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("db connection - READY");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3001, () => {
  console.log("server started on http://localhost:3001");
});
