'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING,
  }, {});
  Account.associate = function (models) {
    // associations can be defined here
    Account.belongsTo(models.Member)
  };
  return Account;
};