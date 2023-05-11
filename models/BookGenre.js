const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const Book = require("./Book")
const Genre = require("./Genre")

class BookGenre extends Model {}

BookGenre.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Genre,
                key: "id"
            }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book,
                key: "id"
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'BookGenre',
      }
);

model.exports = BookGenre;