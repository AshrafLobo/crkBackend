const express = require("express");

const Dividends = require("../models/dividends");

const router = express.Router();

router.get("/", async (req, res) => {
  const dividends = new Dividends();
  const data = await dividends.getAll();
  dividends.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const dividends = new Dividends();
  const data = await dividends.getOne(req.params.id);
  dividends.close();

  if (!data || data.length < 1)
    return res.status(404).send("The dividend with the given ID was not found");

  res.send(data);
});

module.exports = router;
