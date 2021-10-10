const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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
    },
    level : {
        type : Number,
        enum : [1,2,3],
        default : 1
    }
})


module.exports = mongoose.model("User",User);