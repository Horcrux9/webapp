'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('images', {
            pk: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },

            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                unique: true,
                allowNull: false,
            },

            url: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            file_name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            upload_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.now(),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('images');
    }
};