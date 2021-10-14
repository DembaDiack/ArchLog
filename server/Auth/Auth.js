const TokenModel = require("../Database/Tokens");

exports.checkLevel = (token) => {
    return TokenModel.findOne({
        token : token
    })
    .then((result) => {
        if(result == null)
        {
            return null;
        }
        else
        {
            level = result.owner.level;
            return level;
        }
    })
}
exports.checkExpiration = (token) => {
    return TokenModel.findOne({
        token : token
    })
    .then((result)=>{
        if(result == null)
        {
            return null;
        }
        else
        {
            return result.expiration < Date.now();
        }
    })
    
}

exports.canDoJob = async (token,jobLevel) =>{
    tokenLevel = await this.checkLevel(token);
    isExpired = await this.checkExpiration(token);
    return (tokenLevel >= jobLevel && isExpired == false);
}
exports.getTokenEmail = (token) => {
    return TokenModel.findOne({
        token : token
    })
    .then((result) => {
        if(result == null)
        {
            return null;
        }
        else
        {
            email = result.owner.email;
            return email;
        }
    })
}