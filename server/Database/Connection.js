const mongoose = require("mongoose");


//ici nous gerons la connection au serveur a distance, pas touche!

// const uri = "mongodb+srv://root:root@cluster0-txlzu.azure.mongodb.net/DI3?retryWrites=true&w=majority";
const uri = "mongodb+srv://dems314:sedare12@cluster0.yxzs6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
exports.connect = ()=>{
    return mongoose.connect(uri,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    });
}
exports.isConnected = ()=>{
    return mongoose.ConnectionStates.connected;
}
exports.disconnect = ()=> {
    return mongoose.disconnect();
}