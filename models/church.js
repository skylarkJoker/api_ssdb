'use strict';
module.exports = (sequelize, DataTypes) => {
  const Church = sequelize.define('Church', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Church.associate = function (models) {
    // associations can be defined here
    Church.hasMany(models.SbClass);
  };
  return Church;
};