const router = require("express").Router();
const controller = require("../Controller/Controller");

router.get("/",controller.sayHello);



module.exports = router;