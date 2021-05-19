'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('favorites', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      repo_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      repo_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      repo_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      repo_language: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        
        references: {
          model: {
            tableName: 'users',
          },
          
          key: 'id',
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('favorites')
  }
};
