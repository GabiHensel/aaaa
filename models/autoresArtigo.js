module.exports = (sequelize, Sequelize) => {
    const  autoresArtigo = sequelize.define('autoresArtigo', {
      idAutorArtigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      UsuarioID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ArtigoID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    return autoresArtigo;
  }