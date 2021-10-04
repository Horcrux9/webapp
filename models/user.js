'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        id: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUID4,
                primaryKey: true
        },

        first_name: {
                type: DataTypes.STRING,
                allowNull: false
        },

        last_name: {
                type: DataTypes.STRING,
                allowNull: true
        },

        username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                        isEmail: true
                }
        },

        account_created: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW,
                allowNull: false
        },

        account_updated: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW,
                allowNull: false
        },
    }, {
        sequelize,
        tableName: "user",
        modelName: 'User',
        timestamps: false,
    });
    return User;
};
