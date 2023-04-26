const express = require("express");

const FeaturedDownload = require("../models/featuredDownloads");

const router = express.Router();

router.get("/", async (req, res) => {
  const featuredDownloads = await FeaturedDownload.findAll();
  res.send(featuredDownloads);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const featuredDownload = await FeaturedDownload.findOne({ where: { id } });
    if (!featuredDownload) {
      return res.status(404).send("Featured download not found");
    }
    res.json(featuredDownload);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/resources/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const featuredDownload = await FeaturedDownload.findAll({
      where: { postId },
    });
    if (!featuredDownload) {
      return res.status(404).send("Featured download not found");
    }
    res.json(featuredDownload);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
