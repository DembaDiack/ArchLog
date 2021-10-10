const Auth = require("../Auth/Auth");
const UserController = require("./UserController");
const CategorieController = require("./CategoriesController");
const TokenController = require("./TokenController");


/*
 uttiliser cette fonction quand la tache requiert des privileges
 il existe trois niveaux normalement 
 1 : visiteur
 2 : editeur
 3 : administrateur

 la fonction recoit le niveau requit de la tache en premier,la reference de la fonction/tache et les objects req,res
 elle va automatiquement chercher le jetons dans la requete,evaluer sa validite puis executer la fonctions si
 le proprietaire du jetons a assez de privileges et que le jetons na pas expirer


*/
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
//fin fonction verification

exports.createCategorie = (request,response) => {
    CheckAndDoJob(2,CategorieController.createCategorie,request,response);
    //c
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
    CheckAndDoJob(3,TokenController.CreateToken,request,response);
}
exports.getAllTokens = (request,response) => {
    CheckAndDoJob(3,TokenController.getAllTokens,request,response);
}

// les fonctions lister,ajouter,supprimer etc seront ici