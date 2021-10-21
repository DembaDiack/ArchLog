const Auth = require("../Auth/Auth");
const UserController = require("./UserController");
const CategorieController = require("./CategoriesController");
const TokenController = require("./TokenController");
const ArticleController = require("./ArticleController");
const { request } = require("http");

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
    
}
exports.sayHello = (request,response) => {
    response.send("Hello world");
}
exports.createUser = (request,response) => {
    CheckAndDoJob(3,UserController.createUser,request,response);
}
exports.userLogin = (request,response)=>{
    UserController.loginUser(request,response);
}
exports.getAllUsers = (request,response) => {
    CheckAndDoJob(3,UserController.getAllUsers,request,response);
}
exports.createToken = async (request,response) => {
    CheckAndDoJob(3,TokenController.CreateToken,request,response);
}
exports.getAllTokens = (request,response) => {
    CheckAndDoJob(3,TokenController.getAllTokens,request,response);
}
exports.createArticle = (request,response) => {
    CheckAndDoJob(2,ArticleController.createArticle,request,response);
}
exports.getAllCategories = (request,response) => {
    CategorieController.getAllCategories(request,response);
}
exports.getAllArticles = (request,response) => {
    ArticleController.getAllArticles(request,response);
}
exports.getArticlePage = (request,response) => {
    ArticleController.getArticlePage(request,response);
}
exports.getArticleById = (request,response) => {
    ArticleController.getArticleById(request,response);
}
exports.getTokenEmail = (request,response) => {
    CheckAndDoJob(3,TokenController.getTokenEmail,request,response);
}
exports.getUserByEmail = (request,response) => {
    CheckAndDoJob(3,UserController.getUserByEmail,request,response);
}
exports.deleteArticleById = (request,response) => {
    CheckAndDoJob(2,ArticleController.deleteArticleById,request,response);
}
exports.getTokenByEmail = (request,response) => {
    CheckAndDoJob(3,TokenController.getTokenByEmail,request,response);
}
exports.getAllTokensByEmail = (request,response) => {
    CheckAndDoJob(3,TokenController.getAllTokensByEmail,request,response);
}
exports.deleteTokenById = (request,response) => {
    CheckAndDoJob(3,TokenController.deleteToken,request,response);
}
exports.deleteUserByEmail = (request,response)=>{
    CheckAndDoJob(3,UserController.deleteUserByEmail,request,response);
}
exports.findArticleByCat = (request,response)=>{
    ArticleController.findArticleByCat(request,response);
}
exports.countArticles = (request,response)=>{
    ArticleController.numOfArticles(request,response);
}
exports.countArticlesByCat = (request,response)=>{
    ArticleController.numOfArticlesByCat(request,response);
}
exports.editUser = (request,response) => {
    UserController.editUSer(request,response);
}
exports.findCategorie = (request,response) => {
    CategorieController.findCategorie(request,response);
}
exports.editArticle = (request,response) => {
    CheckAndDoJob(2,ArticleController.editArticle,request,response);
}
// les fonctions lister,ajouter,supprimer etc seront ici