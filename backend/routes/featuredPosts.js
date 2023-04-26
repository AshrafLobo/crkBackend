const express = require("express");

const FeaturedPost = require("../models/featuredPosts");

const router = express.Router();

router.get("/", async (req, res) => {
  const featuredPosts = await FeaturedPost.findAll();
  res.send(featuredPosts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const featuredPost = await FeaturedPost.findOne({ where: { id } });
    if (!featuredPost) {
      return res.status(404).send("Featured post not found");
    }
    res.json(featuredPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
