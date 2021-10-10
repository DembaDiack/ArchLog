const CategorieModel = require("../Database/Categorie");
exports.createCategorie = (request,response) => {

    const nom = request.body.nom;
    Categorie.Model.findOne({
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