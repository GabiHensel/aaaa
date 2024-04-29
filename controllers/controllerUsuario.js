const db = require('../config/db_sequelize.js');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },

    async postLogin(req, res) {
        try {
            const usuarios = await db.Usuario.findAll({
                where: { login: req.body.login, senha: req.body.senha }
            });

            if (usuarios.length > 0)
                res.render('home');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
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
            res.status(500).send('Erro interno no servidor');
        }
    },

    async getList(req, res) {
        try {
            const usuarios = await db.Usuario.findAll();
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },

    async getEdit(req, res) {
        try {
            const usuario = await db.Usuario.findByPk(req.params.id);
            if (usuario) {
                res.render('usuario/usuarioEdit', { usuario: usuario.toJSON() });
            } else {
                res.status(404).send('Usuário não encontrado');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },

    async postEdit(req, res) {
        try {
            await db.Usuario.update({
                nome: req.body.nome,
                login: req.body.login,
                senha: req.body.senha,
                tipoUsuario: req.body.tipoUsuario
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/usuarioList');
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },
    async delete(req, res) {
        try {
            const usuario = await db.Usuario.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            await usuario.destroy();
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }         
};
