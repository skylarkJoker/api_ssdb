'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
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
  }, {});
  Member.associate = function (models) {
    // associations can be defined here
    Member.hasOne(models.Account)
    Member.hasMany(models.Attendance)
    Member.belongsTo(models.SbClass)
  };
  return Member;
};