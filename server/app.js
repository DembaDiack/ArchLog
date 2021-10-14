const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");

const mainRoutes = require("./Router/Router");
const Connection = require("./Database/Connection");


app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use(mainRoutes);


// le serveur il va pas demarer si on se connecte pas bien a atlas :) donc verifie ton internet dabord

const connectServer = ()=>
{
    Connection.connect()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`app started on port ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err);
        connectServer();
    })
}

connectServer();
