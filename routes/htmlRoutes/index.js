const router = require("express").Router();
const { Book, Post, User, Dashboard } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all books for homepage and display them in the homepage.handlebars
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });
    res.render("homepage", { books: bookData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
     // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post and display it in the single-post.handlebars
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    console.log("hit post route")
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Book,
        },
      ],
    });
    
    if (!postData) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
});

    //   serialize data so the template can read it
    router.get("/post/:id", withAuth, async (req, res) => {
      try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ["username"],
            },
            {
              model: Book,
            },
          ],
        });
    
        if (!postData) {
          res.status(404).json({ error: "Post not found" });
          return;
        }
    
        const post = postData.toJSON();
    
        res.render("post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });
    

// GET all books and display them in the dashboard.handlebars
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      include: [
        {
          model: Book,
        },
        {
          model: Post,
        },
      ],
    });
    if (!userData) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = userData.toJSON();

    res.render("dashboard", {
      user,
      loggedIn: true, // Assuming the user is logged in since this is a protected route
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

    // serialize data so the template can read it
    router.get("/dashboard", withAuth, async (req, res) => {
      try {
        const userData = await User.findByPk(req.session.user.id, {
          include: [
            {
              model: Book,
            },
            {
              model: Post,
            },
          ],
        });
    
        if (!userData) {
          res.status(404).json({ error: "User not found" });
          return;
        }
    
    const user = userData.get({ plain: true });
    console.log(user)

    res.render("dashboard", {
      ...user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// render the login.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }

  res.render("login");
});

//router.get("/login", (req, res) => {
  //if (req.session.loggedIn) {
    //res.redirect("/");
    //return;
  //}
  //res.render("login");
//});

// render the signup.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }

  res.render("signup");
});


//router.get("/signup", (req, res) => {
  //if (req.session.loggedIn) {
    //res.redirect("/");
    //return;
  //}
  //res.render("signup");
//});

module.exports = router;