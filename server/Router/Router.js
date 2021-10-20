const router = require("express").Router();
const controller = require("../Controller/Controller");


//on va controller les liens ici, choisir la fonction controller qui va gerer ce lien

router.get("/",controller.sayHello);
router.get("/articles",controller.sayHello);

router.post("/token/create",controller.createToken);
router.post("/token/all",controller.getAllTokens);
router.post("/token/email",controller.getTokenEmail);
router.post("/token",controller.getTokenByEmail);
router.post("/token/all/email",controller.getAllTokensByEmail);
router.post("/token/delete",controller.deleteTokenById);

router.post("/user/all",controller.getAllUsers);
router.post("/user/create",controller.createUser);
router.post("/user/login",controller.userLogin);
router.post("/user/email",controller.getUserByEmail);
router.post("/user/delete",controller.deleteUserByEmail);
router.post("/user/edit",controller.editUser)

router.post("/categorie/create",controller.createCategorie);
router.get("/categorie/all",controller.getAllCategories);

router.post("/article/create",controller.createArticle);
router.get("/article/all",controller.getAllArticles);
router.get("/article/page/:page",controller.getArticlePage);
router.post("/article/delete",controller.deleteArticleById);
router.get("/article/categorie/:categorie/:page",controller.findArticleByCat);
router.get("/article/counter",controller.countArticles);
router.get("/article/counter/:Categorie",controller.countArticlesByCat);
router.get("/article/:id",controller.getArticleById);

module.exports = router;