module.exports = (sequelize, Sequelize) => {
    const  notasAvaliacao = sequelize.define('notasAvaliacao', {
      idNotaAvaliacao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      AvaliadorArtigoID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ArtigoID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nota1: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      nota2: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
    return notasAvaliacao;
  }