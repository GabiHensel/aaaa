const express = require('express');
const path = require('path');
const db = require('../config/db_sequelize.js');
const router = express.Router();
const controllerArtigo = require('../controllers/controllerArtigo.js');
const controllerUsuario = require('../controllers/controllerUsuario.js');

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});
*/

module.exports = router;

router.get("/home",function(req,res){res.render('home')});

router.get("/",controllerUsuario.getLogin);
router.get("/login",controllerUsuario.postLogin);
router.get("/usuarioCreate",controllerUsuario.getCreate);
router.post("/usuarioCreate",controllerUsuario.postCreate);
router.get("/usuarioList",controllerUsuario.getList);

router.get("/artigoCreate",controllerArtigo.getCreate);
router.post("/artigoCreate",controllerArtigo.postCreate);
router.get("/artigoList",controllerArtigo.getList);