const UserModel = require("../Database/User");
const ArticleModel = require("../Database/Articles");
const TokenModel = require("../Database/Tokens");
const passPhrase = "ilikecookies";
const AES = require("crypto-js").AES;
const Crypto = require("crypto-js");
const xmlify = require("xmlify");

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
        if(request.query.format == "xml")
        {
            response.send(xmlify(result,"users"));
        }
        else{
            response.send(result);
        }
        
    })
    .catch(err => {
        console.log(err);
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
    let password = request.body.password;
    let python = true;
    if(!request.body.source)
    {
        password = AES.decrypt(request.body.password,passPhrase);
        python = false;
    }

    const user = await UserModel.find({email : email});
    if(user == null) {response.send(false); return;}
    const userPassword = AES.decrypt(user[0].password,passPhrase);
    console.log("helllo");
    console.log(AES.decrypt(request.body.password,"ilikecookies").toString());
    if(!python)
    {
        password = password.toString(Crypto.enc.Utf8);
    }
    if(password == userPassword.toString(Crypto.enc.Utf8))
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
    console.log("delete : ",email);
    UserModel.deleteOne({
        email : email
    })
    .then(result => {
        ArticleModel.deleteMany({"Auteur.email" : email})
        .then(result => {
            console.log("delete docs",result);
        })
        .catch(err => {
            console.log(err);
        })
        console.log(result);
        response.send(result);
    })
    .catch(err => {
        console.log(err);
        response.send(err);
    })
    
}
exports.editUSer = (request,response) => {
    let newUser = request.body.user_data;
    try {
         newUser = JSON.parse(request.body.user_data);
    } catch (error) {
        newUser = request.body.user_data;
    }
    const newPassword = AES.encrypt(newUser.password,passPhrase);
    UserModel.findOne({"email" : newUser.find})
    .then(result => {
        console.log(result);
        result.email = newUser.email;
        result.password = newPassword;
        result.level = Number.parseInt(newUser.level);
        if(result.level > 3)
        {
            result.level = 3
        }
        if(result.level <= 0)
        {
            result.level = 1;
        }
        result.save()
        .then(()=>{
            response.send(result)
        })
        .catch(err=>{
            repsonse.send(err);
        })
    })
    .catch(err => {
        console.log(err)
        response.send("no");
    })
}