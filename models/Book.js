const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const getBookInfo = require('../utils/googleApi')

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
            allowNull: false
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
        modelName: 'Book',
        hooks: {
            // after a new Book is successfully added
            beforeCreate: async (book) => {
                // Extracts image URL from the JSON object
                const response = await getBookInfo(book.title)
                book.book_image = response.image_url; // assigns URL to table
                // we can potentially add an if statement to fill in the author field from the API if the user leaves it blank
                book.author = response.author;
                await book.save();
            }
          }
    }
);

module.exports = Book;
