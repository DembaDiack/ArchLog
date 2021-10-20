const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const soap = require('soap');
const fs = require("fs");
const mainRoutes = require("./Router/Router");
const Connection = require("./Database/Connection");
const {getUserByEmail,getAllUsers,deleteUserByEmail,loginUser,editUSer,createUser,getUserByToken} = require("./Controller/UserController");

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use(mainRoutes);


var xml = fs.readFileSync('user.wsdl', 'utf8');
// le serveur il va pas demarer si on se connecte pas bien a atlas :) donc verifie ton internet dabord

const serviceObject = {
    serviceUsers: {
        serviceUsersPort : {
            getUserById: getUserByToken,
            getUserByEmail: getUserByEmail,
            getAllUserList: getAllUsers,
            addUser: createUser,
            removeUser: deleteUserByEmail,
            updateUser: editUSer,
            authenticateUser: loginUser
        }
    }
}


const connectServer = ()=>
{
    Connection.connect()
    .then(()=>{
        app.listen(4000,()=>{
            console.log(`app started on port ${4000}`);
            var wsdl_path = "/wsdl";
            soap.listen(app, wsdl_path, serviceObject, xml);
        });
    })
    .catch((err)=>{
        console.log(err);
        connectServer();
    })
}

connectServer();
