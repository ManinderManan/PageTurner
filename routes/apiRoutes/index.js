const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/posts', postRoutes);

module.exports = router;