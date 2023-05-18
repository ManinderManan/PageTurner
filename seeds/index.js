const { User, Book } = require("../models");
const userData = require("./user-seeds.json");
const bookData = require("./book-seeds.json");

const seedUsers = async () => {
    try {
      await User.bulkCreate(userData);
      console.log('USERS SEEDED');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  };
  
  const seedBooks = async () => {
    try {
      await Book.bulkCreate(bookData);
      console.log('BOOKS SEEDED');
    } catch (error) {
      console.error('Error seeding books:', error);
    }
  };

  seedUsers();
  seedBooks();