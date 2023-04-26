const express = require("express");

const News = require("../models/news");
const Issuer = require("../models/issuers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const news = await News.findAll({
      attributes: [
        "id",
        "issuerId",
        "title",
        "article",
        "originalSrc",
        "originalPostDate",
        "createdAt",
        "updatedAt",
      ],
    });

    const newData = await Promise.all(
      news.map(async (item) => {
        const issuer = await Issuer.findOne({
          where: { id: item.issuerId },
          attributes: ["srcSmall", "name"],
        });
        const { srcSmall, name } = issuer.toJSON();

        return {
          id: item.id,
          issuerId: item.issuerId,
          title: item.title,
          article: item.article,
          originalSrc: item.originalSrc,
          originalPostDate: item.originalPostDate,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          src: srcSmall,
          issuerName: name,
        };
      })
    );

    res.send(newData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const news = await News.findOne({ where: { id } });
    if (!news) {
      return res.status(404).send("News not found");
    }
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
