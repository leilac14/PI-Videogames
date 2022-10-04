const { DataTypes, Sequelize } = require('sequelize');
const { API_KEY } = process.env;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genre', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {timestamps: false}
)};