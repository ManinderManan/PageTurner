const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const {getBookInfo} = require('../utils/googleApi')

class Book extends Model {}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        book_author: {
            type: DataTypes.STRING,
        },
        book_image: {
            type: DataTypes.STRING, // must store url as string
            allowNull: true
          },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            // add required and validate
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'Book'
    }
);

module.exports = Book;
