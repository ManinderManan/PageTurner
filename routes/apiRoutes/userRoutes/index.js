const router = require("express").Router();
const { User, Post, Book } = require("../../models");

// create a new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
    });

    req.session.save(() => {
        req.session.loggedIn = true;
    res.status(200).json(userData);
    });


  } catch (err) {
    res.status(500).json(err);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (!userData) {
      res.status(400).json({ message: "No user found with that username!" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userData;
      req.session.id = userData.id;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// logout user
router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
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
        include: [{ Post }],
    });
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find a user by id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
        include: [{ Post }],
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
