module.exports = (sequelize, Sequelize) => {
    const  usuario = sequelize.define('usuario', {
      idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipoUsuario: {
        type: Sequelize.ENUM('autor', 'avaliador', 'administrador'),
        allowNull: false
      }
    });
    return usuario;
  }