const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//ici on va mettre un model,des quon auras une bonne structure de base de donnee

const Article = new Schema({
    Auteur : {
        type : Object,
        required : true
    },
    Categorie : {
        type : Object,
        required : true
    },
    Titre : {
        type : String,
        required : true
    },
    Contenue : {
        type : String,
        required : true
    }

})
module.exports = mongoose.model("Article",Article);