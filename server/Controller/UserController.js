const UserModel = require("../Database/User");
const passPhrase = "ilikecookies";
const AES = require("crypto-js").AES;

exports.createUser = (request,response) => {
    newUser = request.body;
    UserModel.findOne({
        "email" : newUser.email
    })
    .then(result => {
        console.log(result);
        if(result == null)
        {
            return new UserModel({
                email : newUser.email,
                password : AES.encrypt(newUser.password, passPhrase),
                level : newUser.level ? newUser.level : 1
            })
            .save()
            .then(()=>{
                response.send(`user ${newUser.email} created succesfully`);
            })
            .catch(err => {
                response.send("error creating user please try again");
            })
        }
        else
        {
            response.send(`user under email ${newUser.email} already exists`);
        }
    })
    .catch(err => {
        console.log(err);
    })
}
exports.getAllUsers = (request,response) => {
    UserModel.find()
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send("a problem happened on our end");
    })
}