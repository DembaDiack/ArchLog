const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//ici on va mettre un model,des quon auras une bonne structure de base de donnee

const Categorie = new Schema({
    nom : String
});


module.exports = mongoose.model("Categorie",Categorie);