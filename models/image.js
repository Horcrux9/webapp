'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

        toJSON() {
            return { ...this.get(), pk: undefined };
        }
    };
    Image.init({

        pk: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
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

    }, {
        sequelize,
        tableName: "images",
        modelName: "Image",
        timestamps: false,
    });

    return Image;
};