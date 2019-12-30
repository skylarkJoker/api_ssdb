"use strict";
module.exports = (sequelize, DataTypes) => {
  const Guests = sequelize.define(
    "Guests",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Guests.associate = function(models) {
    // associations can be defined here
    Guests.belongsTo(models.SbClass);
    Guests.hasMany(models.Attendance);
  };
  return Guests;
};
