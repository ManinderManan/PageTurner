// Connecting table between Users and Books
const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Dashboard extends Model {}

Dashboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Dashboard',
    freezeTableName: true,
    timestamps: false 
  }
);

module.exports = Dashboard;
