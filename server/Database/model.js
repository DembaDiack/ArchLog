const mongoose = require("mongoose");
const Schema = mongoose;


//ici on va mettre un model,des quon auras une bonne structure de base de donnee

const User = new Schema({
    firstName : String,
    lastName : String,
    Email : String
})