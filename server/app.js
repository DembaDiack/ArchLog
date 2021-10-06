const express = require("express");
const app = express();
const PORT = 4000;
const mainRoutes = require("./Router/Router");

app.use(mainRoutes);


app.listen(PORT,()=>{
    console.log(`app started on port ${PORT}`);
});