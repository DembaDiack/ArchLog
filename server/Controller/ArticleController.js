const UserModel = require("../Database/User");
const CategorieModel = require("../Database/Categorie");
const ArticleModel = require("../Database/Articles");
const Auth = require("../Auth/Auth");

exports.createArticle = async (request,response) => {
    const email = await Auth.getTokenEmail(request.body.token);
    const categoriePost = request.body.categorie;
    UserModel.findOne({
        email : email
    })
    .then(user => {
        if(user == null)
        {
            response.send("user doesnt exist");
            console.log(err);
            return;
        }
        else
        {
            CategorieModel.findOne({
                nom : categoriePost
            })
            .then(categorie => {
                if(categorie == null)
                {
                    response.send("categorie doesnt exist");
                    return;
                }
                else
                {
                    return new ArticleModel({
                        Auteur : user,
                        Categorie : categorie,
                        Titre : request.body.titre,
                        Contenu : request.body.contenu
                    })
                    .save()
                    .then(result => {
                        console.log(result);
                        response.send("article saved");
                    })
                    .catch(err => {
                        console.log("error saving article",err);
                        response.send("error saving article");
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        response.send("an error occured");
    })
}
exports.getAllArticles = (request,response) => {
    const q = null;
    const categorie = null;
    ArticleModel.find()
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send("err");
    })
}
exports.getArticlePage = (request,response) => {
    const q = null;
    const categorie = null;

    const regex = [
        {Titre : {"$regex" : q,"$options" : "i"}},
        {Auteur : {"$regex" : q,"$options" : "i"}}
    ]
    const cat = [
        {Categorie : {"$regex" : categorie,"$options" : "i"}}
    ]
    const page = request.params.page;
    const itemsPerPage = 8;
    const startIndex = (page - 1) * itemsPerPage;
    ArticleModel.find({"$or" : regex,"$and" : cat})
    .skip(startIndex)
    .limit(itemsPerPage)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
}
exports.getArticleById = (request,response) => {
    const id = request.params.id;
    ArticleModel.findById(id)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send("article doesnt exist");
    })
}
exports.getNumberOfArticles = (request,response) => {
    ArticleModel.count()
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.deleteArticleById = (request,response) => {
    ArticleModel.deleteOne({
        "_id" : request.body.id
    })
    .then(()=>{
        response.send("article deleted");
    })
    .catch(err => {
        response.send("failed to delete article");
    })
}
exports.findArticleByCat = (request,response) => {
    ArticleModel.find({
        Categorie : request.body.categorie
    })
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}