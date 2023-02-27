const express = require("express");

const Issuers = require("../models/issuers");
const News = require("../models/news");
const Agms = require("../models/agms");
const Egms = require("../models/egms");

const router = express.Router();

router.get("/", async (req, res) => {
  const issuers = new Issuers();
  const data = await issuers.getAll();
  issuers.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const issuers = new Issuers();
  const data = await issuers.getOne(req.params.id);
  issuers.close();

  if (!data || data.length < 1)
    return res.status(404).send("The issuer with the given ID was not found");

  res.send(data);
});

router.get("/news/:issuerId", async (req, res) => {
  const news = new News();
  const data = await news.getIssuerNews(req.params.issuerId);
  news.close();

  if (!data || data.length < 1)
    return res
      .status(404)
      .send(`The news articles for the issuer were not found`);

  res.send(data);
});

router.get("/agms/:issuerId", async (req, res) => {
  const agms = new Agms();
  const data = await agms.getIssuerAgms(req.params.issuerId);
  agms.close();

  if (!data || data.length < 1)
    return res.status(404).send(`The agms for the issuer were not found`);

  res.send(data);
});

router.get("/egms/:issuerId", async (req, res) => {
  const egms = new Egms();
  const data = await egms.getIssuerEgms(req.params.issuerId);
  egms.close();

  if (!data || data.length < 1)
    return res.status(404).send(`The egms for the issuer were not found`);

  res.send(data);
});

module.exports = router;
