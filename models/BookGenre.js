const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BookGenre extends Model {}

BookGenre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'book',
      //   key: 'id'
      // }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'genre',
      //   key: 'id',
      // },
    },
    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'bookGenre',
  }
);

module.exports = BookGenre;