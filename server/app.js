const express = require("express");
const app = express();
const PORT = 4000;
const mainRoutes = require("./Router/Router");
const Connection = require("./Database/Connection");
app.use(mainRoutes);

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
