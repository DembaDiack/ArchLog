const router = require("express").Router();
const controller = require("../Controller/Controller");


//on va controller les liens ici, choisir la fonction controller qui va gerer ce lien

router.get("/",controller.sayHello);
router.get("/articles",controller.sayHello);

router.post("/token/create",controller.createToken);
router.get("/user/all",controller.getAllUsers);
router.post("/user/create",controller.createUser);

module.exports = router;