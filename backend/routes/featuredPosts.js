const express = require("express");

const FeaturedPosts = require("../models/featuredPosts");

const router = express.Router();

router.get("/", async (req, res) => {
  const featuredPosts = new FeaturedPosts();
  const data = await featuredPosts.getAll();
  featuredPosts.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const featuredPosts = new FeaturedPosts();
  const data = await featuredPosts.getOne(req.params.id);
  featuredPosts.close();

  if (!data || data.length < 1)
    return res.status(404).send("The post with the given ID was not found");

  res.send(data);
});

module.exports = router;
