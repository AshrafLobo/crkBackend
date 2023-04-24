const express = require("express");

const FeaturedDownloads = require("../models/featuredDownloads");

const router = express.Router();

router.get("/", async (req, res) => {
  const featuredDownloads = new FeaturedDownloads();
  const data = await featuredDownloads.getAll();
  featuredDownloads.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const featuredDownloads = new FeaturedDownloads();
  const data = await featuredDownloads.getOne(req.params.id);
  featuredDownloads.close();

  if (!data || data.length < 1)
    return res
      .status(404)
      .send("The featured download with the given ID was not found");

  res.send(data);
});

router.get("/resources/:postId", async (req, res) => {
  const featuredDownloads = new FeaturedDownloads();
  const data = await featuredDownloads.getPostsResources(req.params.postId);
  featuredDownloads.close();

  if (!data || data.length < 1)
    return res
      .status(404)
      .send(`The downloads for the post were not found`);

  res.send(data);
});

module.exports = router;
