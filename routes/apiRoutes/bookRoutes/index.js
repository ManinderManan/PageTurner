const router = require('express').Router();
const { Book, BookGenre, Genre, Post } = require('../../../models');
const {getBookInfo} = require("../../../utils/googleApi")

// get all books
router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll({
        // include associated genre and post data
        include: [{ Genre , Post }],
        });
        res.status(200).json(bookData);
    } catch (error) {
        res.status(500).json(error);
    }
    });

// get a single book
router.get('/:id', async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id, {
        // include associated genre and post data
        include: [{ Genre , Post }],
        });
        if (!bookData) {
        res.status(400).json({ message: 'No book found with that id!' });
        return;
        }
        res.status(200).json(bookData);
    } catch (error) {
        res.status(500).json(error);
    }
    });

// create a new book
router.post('/', async (req, res) => {
    const newBook = req.body
    const response = await getBookInfo(req.body.book_title)
    console.log("response here", response)
    newBook.book_author = response.author
    newBook.book_image = response.image_url
    const book = await Book.create({book_title: newBook.book_title, book_author: newBook.book_author, book_image: newBook.book_image, user_id: newBook.user_id})
    res.json(book)
    }
);

// update a book by id
router.put('/:id', async (req, res) => {
    try {
        // update book data
        const bookData = await Book.update(req.body, {
        where: {
            id: req.params.id,
        },
        });

        if (!bookData) {
            res.status(404).json({ message: 'No book found with that id!' });
            return;
            }
        
        // find associated book genre data
        const bookGenres = await BookGenre.findAll({ 
            where: { 
                book_id: req.params.id 
            }, 
        });

        // get list of current genre_ids
        const bookGenreIds = bookGenres.map(({ genre_id }) => genre_id);

        // create filtered list of new genre_ids
        const newBookGenres = req.body.genreIds
        .filter((genre_id) => !bookGenreIds.includes(genre_id))
        .map((genre_id) => {
            return {
            book_id: req.params.id,
            genre_id,
            };
        }
        );
        // figure out which ones to remove
        const bookGenresToRemove = bookGenres
        .filter(({ genre_id }) => !req.body.genreIds.includes(genre_id))
        .map(({ id }) => id);

        // run both actions
        await Promise.all([
        BookGenre.destroy({
             where: {
                 id: bookGenresToRemove
                 }
                 }),
        BookGenre.bulkCreate(newBookGenres),
        ]);


        res.status(200).json(bookData);
    } catch (error) {
        res.status(500).json(error);
    }
    });


// delete a book by id
router.delete('/:id', async (req, res) => {
    // delete one book by its `id` value
    try {
        const bookData = await Book.destroy({
        where: {
            id: req.params.id,
        },
        })
        if (!bookData) {
        res.status(404).json({ message: 'No book found with that id!' });
        return;
        }
        res.status(200).json(bookData);
    } catch (error) {
        res.status(500).json(error);
    }
    });


module.exports = router;