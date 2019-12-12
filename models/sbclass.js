'use strict';
module.exports = (sequelize, DataTypes) => {
  const SbClass = sequelize.define('SbClass', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    teacher: DataTypes.INTEGER,
    secretary: DataTypes.INTEGER,
    care_coordinator: DataTypes.INTEGER,
    division: DataTypes.STRING
  }, {});
  SbClass.associate = function (models) {
    // associations can be defined here
    SbClass.hasMany(models.Member)
    SbClass.hasMany(models.Guests)
    SbClass.hasMany(models.Attendance)
    SbClass.belongsTo(models.Church)
  };
  return SbClass;
};