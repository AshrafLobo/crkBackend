const express = require("express");

const News = require("../models/news");
const Issuers = require("../models/issuers");

const router = express.Router();

router.get("/", async (req, res) => {
  const news = new News();
  const issuers = new Issuers();
  const data = await news.getAll();
  news.close();

  const newData = await Promise.all(
    data.map(async (item, index) => {
      const { issuerId } = item;
      const data = await issuers.getOne(issuerId);
      const { srcSmall, name } = data[0];
      const src = srcSmall;
      const issuerName = name;

      return {
        ...item,
        src,
        issuerName,
      };
    })
  );

  issuers.close();
  res.send(newData);
});

router.get("/:id", async (req, res) => {
  const news = new News();
  const data = await news.getOne(req.params.id);
  news.close();

  if (!data || data.length < 1)
    return res
      .status(404)
      .send("The news article with the given ID was not found");

  res.send(data);
});

module.exports = router;
