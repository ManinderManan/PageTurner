const router = require("express").Router();
const { User, Post, Book } = require("../../../models");

// create a new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
    });

    // save the session so that the user is logged in
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user = userData;
        req.session.id = userData.id;
        
        res.status(200).json(userData);
      });

  } catch (error) {
    res.status(500).json(error);
  }
});

// login user
router.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    // if no user found with that username
    if (!userData) {
      res.status(400).json({ message: "No user found with that username!" });
      return;
    }
    // if user found, check password
    const validPassword = await userData.checkPass(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // save the session so that the user is logged in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userData;
      req.session.id = userData.id;

      res.redirect("/dashboard");
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

// logout user by destroying session and redirecting to homepage
router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// find all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
        include: [Post, Book],
    });
    res.status(200).json(userData);
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message);
  }
});

// find a user by id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
        include: [Post, Book],
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a user by id
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
