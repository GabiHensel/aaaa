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

router.get("/home", function(req, res) {
    res.render('home');
});

router.get("/", controllerUsuario.getLogin);
router.post("/login", controllerUsuario.postLogin);
router.get("/usuarioCreate", controllerUsuario.getCreate);
router.post("/usuarioCreate", controllerUsuario.postCreate);
router.get("/usuarioList", controllerUsuario.getList);
router.get("/usuarioEdit/:id", controllerUsuario.getEdit); // Rota para exibir o formulário de edição
router.post("/usuarioEdit/:id", controllerUsuario.postEdit); // Rota para processar a edição do usuário
router.delete("/usuarioDelete/:id", controllerUsuario.delete);

router.get("/artigoCreate", controllerArtigo.getCreate);
router.post("/artigoCreate", controllerArtigo.postCreate);
router.get("/artigoList", controllerArtigo.getList);
router.get("/artigoEdit/:id", controllerArtigo.getEdit);
router.post("/artigoEdit/:id", controllerArtigo.postEdit);
router.delete("/artigoDelete/:id", controllerArtigo.delete);

