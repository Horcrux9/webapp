'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('users', {
            pk: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                        isEmail: true
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_created: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.now(),
            },
            account_updated: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.now(),
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultvalue: 0,
                allownull: false,
            },
            verified_on: {
                type: DataTypes.DATE,
                defaultValue: null,
                allowNull: true,
            },
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('users');
    }
};
