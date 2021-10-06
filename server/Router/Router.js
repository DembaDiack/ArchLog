const router = require("express").Router();
const controller = require("../Controller/Controller");


//on va controller les liens ici, choisir la fonction controller qui va gerer ce lien

router.get("/",controller.sayHello);



module.exports = router;