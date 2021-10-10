const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Token = new Schema({
    token : {
        type : String,
        required : true
    }
    ,
    owner : {
        type : Object,
        required : true
    },
    expiration : {
        type : Date,
        default : Date.now() + 2629800000
    }
})



module.exports = mongoose.model("Token",Token);