const router = require("express").Router();
const { Book, User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all books for homepage and display them in the homepage.handlebars
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
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


// GET all books and display them in the dashboard.handlebars
// router.get("/dashboard", withAuth, async (req, res) => {
//   console.log("redirected to dash", req.session)
//   try {
//     const userData = await User.findByPk(req.session.user.id, {
//       include: [
//         {
//           model: Book,
//         },
//       ],
//     } )
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }) 

// get all user books to display on dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  await Book.findAll({
    where: { user_id: req.session.user.id },
    raw: true,})
    .then((bookData) => {
  
      res.render("dashboard", { loggedIn:true, user:{books:bookData} });
      console.log(bookData);
  //console.log("redirected to dash", req.session)
  //try {

    // const userData = await User.findByPk(req.session.user.id, {
    //   include: [
    //     {
    //       model: Book,
    //     },
    //   ],
    });
})

    // serialize data so the template can read it
//     const user = userData.get({ plain: true });
//     console.log(user)

//     res.render("dashboard", {
//       ...user,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// render the login.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/addbook", (req, res) => {
  res.render("addbook")
});

// render the signup.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});


router.get('/postview/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [ 
        { 
          model: Post,
          attributes: [
            'id', 'body_review', 'book_id', 'user_id', 'created_at'
          ],
      include: [
        {
          model: User,
        },
      ],
        }],
    });

    const book = bookData.get({ plain: true });

    res.render("postview", {
      ...book,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/edit/:id',withAuth, async(req,res) => {
    await Book.findByPk(req.params.id,{raw:true})
    .then(postData => {
        if(req.session.user_id === postData.user_id){
        //console.log(postData)
        res.render('edit',{ loggedIn : true, post:postData });
        } else {
            res.redirect('/')
        }
    })
   
})

router.get('/post', async (req, res) => {

  res.render('post');
})

// // render the add-book.handlebars page if the user is logged in and redirect to the homepage if they are not logged in already
// router.get("/addbook", withAuth, (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//   res.render("addbook")
//   // {
//   //   loggedIn: req.session.loggedIn,
//   // });
// });

module.exports = router;