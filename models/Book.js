const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const Post = require("./Post")
const BookGenre = require("./BookGenre")

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
        // possibly move rating to Post model
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookGenre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BookGenre,
                key: "id" 
              }
        },
        post_id: {
            type: DataTypes.INTEGER,
            // if we make Book and Post creation seperate we will need to allow null and create an update route?
            allowNull: false,
            references: {
                model: Post,
                key: "id",
            }
        }
        // would need to add User id if we made discussed changes
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Book',
    }
);

module.exports = Book;
