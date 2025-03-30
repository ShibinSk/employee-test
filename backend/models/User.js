// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   address: String,
//   gender: String,
//   username: { type: String, unique: true },
//   password: String,
// });

// module.exports = mongoose.model("User", UserSchema);

////////
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  gender: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
