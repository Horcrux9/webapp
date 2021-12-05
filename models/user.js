'use strict';
const {
    Model,
    Sequelize
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

        toJSON() {
            return {
                ...this.get(),
                password: undefined,
                pk: undefined,
                verified: this.verified || false,
                verified_on: this.verified_on || "",
            };
        }
    };
    User.init({

        pk: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },

        id: {
            /**
             * https://stackoverflow.com/questions/43993725/syntax-error-at-or-near-serial-with-autoincrement-only
             * https://www.postgresql.org/docs/9.4/uuid-ossp.html
             * autoIncrement: true, TODO
             * primaryKey: true,  https://stackoverflow.com/questions/52414414/best-practices-on-primary-key-auto-increment-and-uuid-in-rdbms-and-sql-databas
             */
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
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

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        account_created: {
            type: DataTypes.DATE,
            defaultValue: Date.now(),
            allowNull: false,
        },

        account_updated: {
            type: DataTypes.DATE,
            defaultValue: Date.now(),
            allowNull: false,
        },

        verified: {
            type: DataTypes.BOOLEAN,
            defaultvalue: false,
            allownull: false,
        },

        verified_on: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "users",
        modelName: 'User',
        timestamps: false,
    });
    return User;
};