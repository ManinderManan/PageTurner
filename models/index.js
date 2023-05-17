// added Post to the list of models to be exported
const User = require("./User");
const Post = require("./Post");
const Book = require("./Book");
const Genre = require("./Genre");
const BookGenre = require("./BookGenre");

// .hasMany(, {
//   foreignKey: 'gallery_id',
// });

// .belongsTo(, {
//   foreignKey: 'gallery_id',
// });


Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "cascade",
});

User.hasMany(Post, {
    foreignKey: "user_id",
});

// User will have many Books if we make discussed changes

// Post.belongsTo(Book, {
//     foreignKey: "book_id",
// });

Book.hasMany(Post, {
    foreignKey: "book_id",
});

// // Books belongToMany Genres (through BookGenre)
// Book.belongsToMany(Genre, {
//     through: BookGenre,
//     foreignKey: "book_id",
// });

// // Genres belongToMany Books (through BookGenre)
// Genre.belongsToMany(Book, {
//     through: BookGenre,
//     foreignKey: "genre_id",
// });

Genre.belongsTo(Book, {
    foreignKey: "book_id",
}) 

// this section is incomplete while we wait to decide on user flow

module.exports = { Book, User, Genre, BookGenre, Post };