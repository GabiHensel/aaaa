const db = require('../config/db_sequelize.js');
const path = require('path');

module.exports={
    async getLogin(req, res){
        res.render('usuario/login',{layout: 'noMenu.handlebars'});
    },
    async postLogin(req, res){
        db.Usuario.findAll({where: {login: req.body.login, senha: req.body.senha}}
        ).then(usuarios =>{
        if (usuarios.length > 0)
            res.render('home');
        else
            res.redirect('/');
        }).catch((err) =>{
            console.log(err);
        });
},
    async getCreate(req,res){
        res.render('usuario/usuarioCreate');
},
    async postCreate(req,res){
        db.Usuario.create({
            nome:req.body.nome,
            login:req.body.login,
            senha:req.body.senha,
            tipoUsuario:req.body.tipoUsuario
        }).then(()=>{
            res.redirect('/home');
        }).catch((err)=>{
            console.log(err);
        });
    },
    async getList(req,res){
        db.Usuario.findAll().then(usuarios =>{
            res.render('usuario/usuarioList',
        {usuarios: usuarios.map(user =>user.toJSON())});
        }).catch((err)=>{
            console.log(err);
        })
    }
}
