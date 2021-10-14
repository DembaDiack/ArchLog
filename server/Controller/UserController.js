const UserModel = require("../Database/User");
const TokenModel = require("../Database/Tokens");
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
        console.log(result);
        response.send(result);
    })
    .catch(err => {
        response.send("a problem happened on our end");
    })
}
exports.getUserByEmail = (request,response) => {
    const email = request.body.email;
    console.log(email);
    UserModel.find({
        email : email
    })
    .then(result => {
        console.log(result);
        if(result == null)
        {
            response.send("user not found");
        }
        else
        {
            response.send(result);
        }
    })
    .catch(err => {
        console.log(err);
        response.send("an error has occured");
    });

}
exports.getUserByToken = (request,response) => {
    const tokenEnc = request.body.token;
    const token = AES.decrypt(tokenEnc,passPhrase).toString();
    TokenModel.find({
        token : token
    })
    .then(result => {
        response.send(result.owner);
    })
    .catch(err => {
        console.log(err);
        response.send("an error has occured");
    })
}
exports.loginUser = async (request,response) => {
    const email = request.body.email;
    const password = AES.decrypt(request.body.password,passPhrase);

    const user = await UserModel.find({email : email});
    if(user == null) {response.send(false); return;}
    const userPassword = AES.decrypt(user[0].password,passPhrase);
    console.log(userPassword,password)
    if(password.toString() == userPassword.toString())
    {
        response.send(true);
    }
    else
    {
        response.send(false);
    }

}
exports.deleteUserByEmail = (request,response) => {
    const email = request.body.email;
    UserModel.find({
        email : email
    })
    .remove();
    TokenModel.find({
        "owner.email" : email
    }).remove();
    
}