const CategorieModel = require("../Database/Categorie");
exports.createCategorie = (request,response) => {

    let nom = request.body.nom;
    nom = nom[0].toUpperCase() + nom.slice(1);
    CategorieModel.findOne({
        nom : nom
    })
    .then(result => {
        if(result == null)
        {
            return new CategorieModel({
                nom : nom
            })
            .save()
            .then(()=>{
                response.send(`categorie ${nom} cree avec success`);
            })
        }
        else
        {
            response.send(`categorie ${nom} existe deja`);
        }
    })
    .catch(err => {
        response.send("une erreur sest produite de notre cote");
    })
}
exports.findCategorie = (categorie) =>{
    return CategorieModel.findOne({
        nom : categorie
    })
    .then((result)=>{
        return result
    })
}
exports.getAllCategories = (request,response)=>{
    CategorieModel.find()
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send("err");
    })
}