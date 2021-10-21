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
exports.findCategorie = (request,response) =>{
    const categorie = request.params.nom;

    return CategorieModel.findOne({
        nom : categorie
    })
    .then((result)=>{
        response.send(result);
    })
    .catch(err => {
        response.send(err);
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

exports.deleteCategorie = (request,response)=> {
    const cat = request.body.cat;
    ArticleModel.find({
        "Categorie" : cat
    })
    .then(result => {
        const promises = [];
        result.forEach(art => {
            promises.push(art.remove());
        })
        promises.all()
        .then(()=>{
            CategorieModel.findOne({
                "nom" : cat
            })
            .then(result => {
                result.remove();
            })
        })

    })
}
