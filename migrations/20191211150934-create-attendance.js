'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      status: {
        type: Sequelize.STRING
      },
      study: {
        type: Sequelize.BOOLEAN
      },
      MemberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Members',
          key: 'id'
        }
      },
      SbClassId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SbClasses',
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
    return queryInterface.dropTable('Attendances');
  }
};