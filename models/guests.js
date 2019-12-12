'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guests = sequelize.define('Guests', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});
  Guests.associate = function (models) {
    // associations can be defined here
    Guests.belongsTo(models.SbClass)
  };
  return Guests;
};