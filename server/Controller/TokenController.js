const TokenModel = require("../Database/Tokens");
const UserModel = require("../Database/User");
const crypto = require("crypto-js");

const generateRandomKey = ()=>{
    return crypto.lib.WordArray.random(16).toString();
}

exports.CreateToken = async (request,response)=> {
    const newToken = generateRandomKey();
    const owner = await UserModel.findOne({
        email : request.body.email
    });
    console.log(owner);
    if(owner == null)
    {
        response.send(`owner of token ${request.body.email} doesnt exist`);
        return;
    }
    TokenModel.findOne({
        token : newToken
    })
    .then(result => {
        if(result == null)
        {
            return new TokenModel({
                token : newToken,
                owner : owner
            })
            .save()
            .then(()=>{
                response.send(`token for user ${request.body.email} => ${newToken} <= save it somewhere safe!`);
            })
            .catch(err => {
                response.send("an error occured");
                console.log(err);
            })
        }
        else
        {
            createToken(request,response);
        }
    })
    .catch(err => {
        console.log(err)
    })
}