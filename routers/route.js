const express = require('express');
const path = require('path');
const db = require('../config/db_sequelize.js');
const router = express.Router();
const controllerArtigo = require('../controllers/controllerArtigo.js');
const controllerUsuario = require('../controllers/controllerUsuario.js');

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/


module.exports = router;

router.get("/home", function(req, res) {
    res.render('home');
});

router.get("/",controllerUsuario.getLogin);
router.post("/login", controllerUsuario.postLogin); // Rota POST para login
router.get("/login", controllerUsuario.getLogin); // Rota GET para login

router.get("/usuarioCreate",controllerUsuario.getCreate);
router.post("/usuarioCreate",controllerUsuario.postCreate);
router.get("/usuarioList",controllerUsuario.getList);

router.get("/artigoCreate", controllerArtigo.getCreate);
router.post("/artigoCreate", controllerArtigo.postCreate);
router.get("/artigoList", controllerArtigo.getList);
router.get("/artigoEdit/:id", controllerArtigo.getEdit);
router.post("/artigoEdit/:id", controllerArtigo.postEdit);
router.delete("/artigoDelete/:id", controllerArtigo.delete);

router.get("/atribuirAvaliador/:artigoId", controllerAvaliacao.getCreate);
router.post("/atribuirAvaliador/:artigoId", controllerAvaliacao.postCreate);
router.get('/editarAvaliacao/:id', controllerAvaliacao.getEdit);
router.post('/editarAvaliacao/:id', controllerAvaliacao.postEdit);
