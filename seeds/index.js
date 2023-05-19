const { User, Book, Post } = require("../models");
const userData = require("./user-seeds.json");
const bookData = require("./book-seeds.json");
const postData = require("./post-seeds.json");

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

  const seedPosts = async () => {
    try {
      await Post.bulkCreate(postData);
      console.log('POSTS SEEDED');
    } catch (error) {
      console.error('Error seeding posts:', error);
    }
  };

  seedUsers();
  seedBooks();
  seedPosts();