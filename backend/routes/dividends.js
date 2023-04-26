const express = require("express");

const Dividend = require("../models/dividends");

const router = express.Router();

router.get("/", async (req, res) => {
  const dividends = await Dividend.findAll();
  res.send(dividends);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const dividend = await Dividend.findOne({ where: { id } });
    if (!dividend) {
      return res.status(404).send("Dividend not found");
    }
    res.json(dividend);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
