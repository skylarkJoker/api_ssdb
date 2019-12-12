'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: DataTypes.STRING,
    study: DataTypes.BOOLEAN
  }, {});
  Attendance.associate = function (models) {
    // associations can be defined here
  };
  return Attendance;
};