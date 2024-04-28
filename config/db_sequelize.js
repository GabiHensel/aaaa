const Sequelize = require('sequelize');
const sequelize = new Sequelize('web2_db', 'postgres', 'gabi123', {
    host: 'localhost',
    dialect: 'postgres'
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.artigo = require('../models/artigo.js')(sequelize, Sequelize);
db.usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.autoresArtigo = require('../models/autoresArtigo.js')(sequelize, Sequelize);
db.avaliadoresArtigo = require('../models/avaliadoresArtigo.js')(sequelize, Sequelize);
db.notasAvaliacao = require('../models/notasAvaliacao.js')(sequelize, Sequelize);

/*artigo.belongsToMany(usuario, {through: autoresArtigo});
usuario.belongsToMany(artigo, {through: autoresArtigo});
artigo.belongsToMany(usuario, {through: avaliadoresArtigo});
usuario.belongsToMany(artigo, {through: avaliadoresArtigo});
notasAvaliacao.belongsTo(artigo, {foreignKey: 'ArtigoID'});
artigo.hasMany(notasAvaliacao, {foreignKey: 'ArtigoID'});
*/

db.artigo.belongsToMany(db.usuario, {through: db.autoresArtigo});
db.usuario.belongsToMany(db.artigo, {through: db.autoresArtigo});
db.artigo.belongsToMany(db.usuario, {through: db.avaliadoresArtigo});
db.usuario.belongsToMany(db.artigo, {through: db.avaliadoresArtigo});
db.notasAvaliacao.belongsTo(db.artigo, {foreignKey: 'ArtigoID'});
db.artigo.hasMany(db.notasAvaliacao, {foreignKey: 'ArtigoID'});

module.exports = db;

sequelize.sync()
    .then(async () => {
db.artigo.create({
    titulo: 'Primeiro Teste',
    resumo: 'Testando o funcionamento do banco',
    linkPDF: 'link.com.br'
}).then(artigo => {
    console.log('Artigo criado com sucesso:', artigo);
}).catch(error => {
    console.error('Erro ao criar o artigo:', error);
})
})
.catch(err => console.log('Erro ao sincronizar o banco de dados:', err));