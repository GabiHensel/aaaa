const db = require('../config/db_sequelize.js');
const path = require('path');
const artigo = require('../models/artigo.js');

module.exports = {
  async getCreate(req, res) {
    try {
      const usuarios = await db.Usuario.findAll({
        where: {
          tipoUsuario: 'autor'
        }
      });
      const plainUsuarios = usuarios.map(user => user.get({ plain: true }));
      res.render('artigo/artigoCreate', { usuarios: plainUsuarios });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  async postCreate(req, res) {
    try {
        const { titulo, resumo, linkPDF, autores } = req.body;
        const autoresArray = Array.isArray(autores) ? autores : [autores];

        // Adicione esta validação
        if (autoresArray.length < 1 || autoresArray.length > 5) {
            return res.status(400).send('Por favor, selecione entre 1 e 5 autores.');
        }

        const novoArtigo = await db.Artigo.create({ titulo, resumo, linkPDF });
        const autorArtigos = autoresArray.map(id => ({ artigoId: novoArtigo.id, usuarioId: id }));
        await db.AutorArtigo.bulkCreate(autorArtigos);
        res.redirect('/home');
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro interno no servidor');
    }
}, 

  async getList(req, res) {
    try {
      const artigos = await db.Artigo.findAll({
        include: [
          {
            model: db.Usuario,
            as: 'usuarios', // Altere 'autores' para 'usuarios'
            through: { attributes: [] }
          },
          {
            model: db.Avaliacao,
            as: 'avaliacaos'
          }
        ]
      });
      res.render('artigo/artigoList', { artigos: artigos });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
  
};
