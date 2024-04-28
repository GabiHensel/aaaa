const routes = require('./routers/route.js');
const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db_sequelize.js');
const artigoController = require('./controllers/controllerArtigo.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(4000,function(){
    console.log("server online");
});

