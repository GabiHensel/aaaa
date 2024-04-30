const db = require('../config/db_sequelize.js');

module.exports = {
    async getCreate(req, res) {
        try {
            const avaliadores = await db.Usuario.findAll({ where: { tipoUsuario: 'avaliador' } });
            res.render('avaliacao/atribuirAvaliador', { 
                avaliadores: avaliadores.map(avaliador => avaliador.toJSON()), 
                artigoId: req.params.artigoId 
            });            
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },

    async postCreate(req, res) {
        try {
            let avaliadores = req.body.avaliadorId;
            const artigoId = req.params.artigoId;
    
            // Se avaliadores não for um array, converta-o em um array
            if (!Array.isArray(avaliadores)) {
                avaliadores = [avaliadores];
            }
    
            for (let i = 0; i < avaliadores.length; i++) {
                await db.Avaliacao.create({ artigoId, usuarioId: avaliadores[i], nota1: 0, nota2: 0, notaFinal: 0 });
            }
            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },
    async getList(req, res) {
        try {
            const avaliacoes = await db.Avaliacao.findAll();
            res.render('avaliacao/avaliacaoList', { avaliacoes: avaliacoes.map(avaliacao => avaliacao.toJSON()) });
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },  
    async getEdit(req, res) {
        try {
            const avaliacao = await db.Avaliacao.findByPk(req.params.id);
            if (avaliacao) {
                res.render('avaliacao/editarAvaliacao', { avaliacao: avaliacao.toJSON() });
            } else {
                res.status(404).send('Avaliação não encontrada');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    },

    async postEdit(req, res) {
        try {
            console.log(req.body);
            const { nota1, nota2 } = req.body;
            const notaFinal = nota1 * nota2;
            const status = notaFinal > 6 ? 'aprovado' : 'rejeitado';
    
            await db.Avaliacao.update({
                nota1,
                nota2,
                notaFinal
            }, {
                where: {
                    id: req.params.id
                }
            });
    
            const avaliacao = await db.Avaliacao.findByPk(req.params.id);
            console.log(avaliacao);
            const artigo = await db.Artigo.findByPk(avaliacao.artigoId);
            await artigo.update({status});
            await artigo.reload();
    
            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro interno no servidor');
        }
    }
};
