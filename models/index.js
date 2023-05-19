const User = require("./User");
const Post = require("./Post");
const Book = require("./Book");
const Dashboard = require("./Dashboard");

// Users can have multiple books
User.hasMany(Book, {
    foreignKey: "user_id",
});

// Allows users to add many books to dashboard 
User.belongsToMany(Book, {
    through: "Dashboard",
    foreignKey: "user_id",
    otherKey: "book_id",
});

// Books can be added to other user's dashboard
Book.belongsToMany(User, {
    through: "Dashboard",
    foreignKey: "book_id",
    otherKey: "user_id",
});

// Many posts can be made about a book
Book.hasMany(Post, {
    foreignKey: "book_id",
});

// Users can have many posts
User.hasMany(Post, {
    foreignKey: "user_id",
});
    
module.exports = { Book, User, Post, Dashboard };
