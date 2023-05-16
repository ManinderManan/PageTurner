const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

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
        // moved rating from Book to Post model
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
        body_review: {
           type: DataTypes.TEXT,
           allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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