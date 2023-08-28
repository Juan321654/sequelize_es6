'use strict';
export async function up(queryInterface, Sequelize) {
     await queryInterface.createTable('Users', {
          id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER
          },
          name: {
               type: Sequelize.STRING
          },
          age: {
               type: Sequelize.INTEGER
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
}
export async function down(queryInterface, Sequelize) {
     await queryInterface.dropTable('Users');
}