"use strict";
module.exports = (sequelize, DataTypes) => {
  const Saved = sequelize.define(
    "Saved",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      saved: DataTypes.INTEGER
    },
    {
      freezeTableName: true
    }
  );
  Saved.associate = function(models) {
    // associations can be defined here
    Saved.belongsTo(models.SbClass);
  };
  return Saved;
};
