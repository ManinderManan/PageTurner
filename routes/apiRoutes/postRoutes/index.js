const router = require("express").Router();
const { Post, Book, User } = require("../../../models");

// get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // include associated user and book data
      include: [{ User, Book }],
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a single post
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // include associated user and book data
      include: [{ User, Book }],
    });
    if (!postData) {
      res.status(400).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new post
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      // associate post with logged in user
      user_id: req.session.id,
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // update a post
// router.put("/:id", async (req, res) => {
//   try {
//     const postData = await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//         user_id: req.session.id,
//       },
//     });
//     if (!postData) {
//       res.status(400).json({ message: "No post found with that id!" });
//       return;
//     }
//     res.status(200).json(postData);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(400).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

