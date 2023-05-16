const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User")
const Book = require("./Book")

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body_review: {
           type: DataTypes.TEXT,
           allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //   model: User,
            //   key: "id" 
            // }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //   model: Book,
            //   key: "id" 
            // }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "Post"
      }
)

module.exports = Post;