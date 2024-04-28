module.exports = (sequelize, Sequelize) => {
    const  avaliadoresArtigo = sequelize.define('avaliadoresArtigo', {
      idAvaliadorArtigo: {
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
    return avaliadoresArtigo;
  }