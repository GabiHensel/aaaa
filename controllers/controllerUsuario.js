const db = require('../config/db_sequelize.js');
const path = require('path');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login'); // Alteração aqui
    },

    async postLogin(req, res) {
        try {
            const { login, senha } = req.body;
            const usuarios = await db.Usuario.findAll({
                where: { login: login, senha: senha }
            });
    
            if (usuarios.length > 0) {
                // Redirecionar para a página home após o login bem-sucedido
                res.redirect('/home');
            } else {
                // Redirecionar de volta para a página de login se as credenciais estiverem incorretas
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err);
            res.redirect('/login');
        }
    },

    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },

    async postCreate(req, res) {
        try {
            await db.Usuario.create({
                nome: req.body.nome,
                login: req.body.login,
                senha: req.body.senha,
                tipoUsuario: req.body.tipoUsuario
            });
            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    },

    async getList(req, res) {
        try {
            const usuarios = await db.Usuario.findAll();
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    },
    async getCreate(req, res) {
        // Verifica se o usuário logado é um administrador
        const administrador = req.session.user && req.session.user.tipoUsuario === "administrador";
        
        // Renderiza o template e passa a variável administrador
        res.render('usuario/usuarioCreate', { administrador });
    }
};
