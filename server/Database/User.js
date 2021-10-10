const mongoose = require("mongoose");
const Schema = mongoose;


//ici on va mettre un model,des quon auras une bonne structure de base de donnee

const User = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        require : true
    },
    signUpDate : {
        type : Date,
        default : Date.now(),
        required : false
    }
})


module.exports = mongoose.model("User",User);