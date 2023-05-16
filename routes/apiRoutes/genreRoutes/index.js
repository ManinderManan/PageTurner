const router = require("express").Router();
const { Book, BookGenre, Genre } = require("../../../models");

// find all genres
router.get("/", async (req, res) => {
  try {
    const genreData = await Genre.findAll({
      // included associated book data
      include: [{ Book }],
    });
    res.status(200).json(genreData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find a single genre by id
router.get("/:id", async (req, res) => {
  try {
    const genreData = await Genre.findByPk(req.params.id, {
      // included associated book data
      include: [{ Book }],
    });
    if (!genreData) {
      res.status(404).json({ message: "No genre found with that id!" });
      return;
    }
    res.status(200).json(genreData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new genre
router.post("/", async (req, res) => {
  try {
    const genreData = await Genre.create(req.body);
    res.status(200).json(genreData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a genre by id
router.put("/:id", async (req, res) => {
  try {
    const genreData = await Genre.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!genreData) {
      res.status(404).json({ message: "No genre found with that id!" });
      return;
    }
    res.status(200).json(genreData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a genre by id
router.delete("/:id", async (req, res) => {
    try {
        const genreData = await Genre.destroy({
        where: {
            id: req.params.id,
        },
        });
        if (!genreData) {
        res.status(404).json({ message: "No genre found with that id!" });
        return;
        }
        res.status(200).json(genreData);
    } catch (error) {
        res.status(500).json(error);
    }
    });

    
module.exports = router;