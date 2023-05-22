const User = require("./User");
const Book = require("./Book");


// Users can have multiple books
User.hasMany(Book, {
    foreignKey: "user_id",
});

// Allows users to add many books to dashboard 
Book.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

// // Books can be added to other user's dashboard
// Book.belongsToMany(User, {
//     through: "Dashboard",
//     foreignKey: "book_id",
//     otherKey: "user_id",
// });

// Dashboard.belongsTo(User, {
//     through: "Dashboard",
//     foreignKey: "user_id",
// })

// // Many posts can be made about a book
// Book.hasMany(Post, {
//     foreignKey: "book_id",
// });

// // Users can have many posts
// User.hasMany(Post, {
//     foreignKey: "user_id",
// });
    
module.exports = { Book, User, };
