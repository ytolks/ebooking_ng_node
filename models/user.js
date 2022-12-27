const mongoose = require("mongoose");

//creating mongodb schema
const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone_number: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
});

usersSchema.virtual("id").get(() => this._id.toHexString());

usersSchema.set("toJSON", {
  virtual: true,
});

//creating model
exports.User = mongoose.model("User", usersSchema);
exports.usersSchema = usersSchema;
