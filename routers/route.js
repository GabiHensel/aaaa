const express = require('express');
const db = require('../config/db_sequelize.js');
const controllerArtigo = require('../controllers/controllerArtigo.js');
const controllerAvaliadoresArtigo = require('../controllers/controllerAvaliadoresArtigo.js');
const controllerNotasAvaliacao = require('../controllers/controllerNotasAvaliacao.js');
const controllerAutoresArtigo = require('../controllers/controllersAutoresArtigo.js');
const controllerUsuario = require('../controllers/controllerUsuario.js');
const app = express();

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});
*/
app.get ("/",function (req , res ) {
    res . send ('Pagina Inicial ');
}) ;
    
//db.Cidade.create({nome:'Dois Vizinhos', estado:'Paraná'})
//db.Usuario.create({login:'admin', senha:'1234', tipo:2, cidadeId:1});
