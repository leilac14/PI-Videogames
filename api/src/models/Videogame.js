const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    background_image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://as1.ftcdn.net/v2/jpg/04/44/05/00/1000_F_444050065_Mx9aD1AoWBypuPiA8LdDVHB6bGPhH1SN.jpg',
    },
    description:{
      type: DataTypes.STRING(50000),
      allowNull: true
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    // createdInDB: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true,
    //   defaultValue: true
    // }
  }, {timestamps: false});
};
