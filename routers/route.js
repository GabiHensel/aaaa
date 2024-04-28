const express = require('express');
const db = require('../config/db_sequelize.js');
const router = express.Router();
const controllerArtigo = require('../controllers/controllerArtigo.js');
const controllerUsuario = require('../controllers/controllerUsuario.js');
const app = express();

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});
*/
app.get ("/",function (req , res ) {
    res.send ('Pagina Inicial ');
}) ;

module.exports = router;
