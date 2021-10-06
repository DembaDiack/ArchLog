const mongoose = require("mongoose");
const Schema = mongoose;

const User = new Schema({
    firstName : String,
    lastName : String,
    Email : String
})