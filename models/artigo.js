module.exports = (sequelize, Sequelize) => {
    const artigo = sequelize.define('artigo', {
      idArtigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resumo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      linkPDF: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('em revisão', 'aprovado', 'rejeitado'),
        allowNull: false,
        defaultValue: 'em revisão'
      },
      nota: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    });
    return artigo;
  }