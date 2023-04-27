const express = require("express");

const Issuer = require("../models/issuers");
const News = require("../models/news");
const Dividend = require("../models/dividends");
const Agm = require("../models/agms");
const Egm = require("../models/egms");

const router = express.Router();

router.get("/", async (req, res) => {
  const agms = await Issuer.findAll();
  res.send(agms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const issuer = await Issuer.findOne({ where: { id } });
    if (!issuer) {
      return res.status(404).send("Issuer not found");
    }
    res.json(issuer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/news/:issuerId", async (req, res) => {
  const issuerId = req.params.issuerId;
  let { page } = req.query;
  let size = 9;

  if (page) {
    if (Number.isNaN(page) || page < 0) res.status(404).send("Invalid query");

    page = parseInt(page);
  } else {
    page = 0;
  }

  try {
    const news = await News.findAndCountAll({
      where: { issuerId },
      limit: size,
      offset: page * size,
      order: [["originalPostDate", "DESC"]],
    });

    const newData = await Promise.all(
      news.rows.map(async (item) => {
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

    res.send({
      data: [...newData],
      currentPage: page,
      totalPages: Math.ceil(news.count / size),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/dividends/:issuerId", async (req, res) => {
  const issuerId = req.params.issuerId;
  try {
    const issuer = await Dividend.findAll({ where: { issuerId } });
    if (!issuer) {
      return res.status(404).send("Dividend not found");
    }
    res.json(issuer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/agms/:issuerId", async (req, res) => {
  const issuerId = req.params.issuerId;
  try {
    const issuer = await Agm.findAll({ where: { issuerId } });
    if (!issuer) {
      return res.status(404).send("Agm not found");
    }
    res.json(issuer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/egms/:issuerId", async (req, res) => {
  const issuerId = req.params.issuerId;
  try {
    const issuer = await Egm.findAll({ where: { issuerId } });
    if (!issuer) {
      return res.status(404).send("Egm not found");
    }
    res.json(issuer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
