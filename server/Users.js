const mongoose = require("mongoose");

// Define the User schema and model
//These are correct
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true },
    password: String
  });

//Model
const Users = mongoose.model('User', userSchema, "users");
module.exports = Users;
