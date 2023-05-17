const router = require("express").Router();
const { Book, BookGenre, Genre, Post, User } = require("../../models");

// GET all books for homepage and display them in the homepage.handlebars
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Genre,
          attributes: ["genre_name"],
        },
      ],
    });

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post and display it in the single-post.handlebars
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Book,
          attributes: ["book_title", "book_author", "rating"],
          include: [
            {
              model: BookGenre,
              include: [
                {
                  model: Genre,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    //   serialize data so the template can read it
    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all posts and display them in the dashboard.handlebars
router.get("/dashboard", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Book,
          attributes: ["book_title", "book_author", "rating"],
          include: [
            {
              model: BookGenre,
              include: [
                {
                  model: Genre,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    // serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      ...posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render the login.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// render the signup.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;