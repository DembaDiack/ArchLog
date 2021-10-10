const crypto = require("crypto-js");
const Auth = require("../Auth/Auth");
const UserController = require("./UserController");
const CategorieController = require("./CategoriesController");

// const generateRandomKey = ()=>{
//     return crypto.lib.WordArray.random(16).toString();
// }
const CheckAndDoJob = async (jobLevel,job,request,response) => {
    if(request.body.token == null) {response.send("provide token please"); return;}
    const token = request.body.token;
    let confirmation = await Auth.canDoJob(token,jobLevel);
    if(confirmation == true)
    {
        job(request,response);
    }
    else
    {
        response.send("not enough priveleges");
    }
    
}

exports.createCategorie = (request,response) => {
    CategorieController.createCategorie(request,response);
}
exports.sayHello = (request,response) => {
    response.send("Hello world");
}
exports.createUser = (request,response) => {
    CheckAndDoJob(3,UserController.createUser,request,response);
}
exports.getAllUsers = (request,response) => {
    UserController.getAllUsers(request,response);
}
exports.createToken = async (request,response) => {
    
}

// les fonctions lister,ajouter,supprimer etc seront ici