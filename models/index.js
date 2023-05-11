const Book = require('./Book');
const User = require('./User')
const Genre = require('./Genre')
const BookGenre = require('./BookGenre')

// .hasMany(, {
//   foreignKey: 'gallery_id',
// });

// .belongsTo(, {
//   foreignKey: 'gallery_id',
// });

module.exports = { Book, User, Genre, BookGenre };
