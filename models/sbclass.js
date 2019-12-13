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
    teacher: DataTypes.UUID,
    secretary: DataTypes.UUID,
    care_coordinator: DataTypes.UUID,
    division: DataTypes.STRING
  }, {});
  SbClass.associate = function (models) {
    // associations can be defined here
    SbClass.hasMany(models.Member)
    SbClass.hasMany(models.Guests)
    SbClass.hasMany(models.Attendance)
    SbClass.belongsTo(models.Church)
    SbClass.belongsTo(models.Member, {
      as: 'Teacher',
      foreignKey: 'teacher',
      constraints: false
    })
    SbClass.belongsTo(models.Member, {
      as: 'Secretary',
      foreignKey: 'secretary',
      constraints: false
    })
    SbClass.belongsTo(models.Member, {
      as: 'Care_Coordinator',
      foreignKey: 'care_coordinator',
      constraints: false
    })
  };
  return SbClass;
};