'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SbClasses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      teacher: {
        type: Sequelize.INTEGER
      },
      secretary: {
        type: Sequelize.INTEGER
      },
      care_coordinator: {
        type: Sequelize.INTEGER
      },
      division: {
        type: Sequelize.STRING
      },

      ChurchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Churches',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SbClasses');
  }
};