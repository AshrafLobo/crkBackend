const express = require("express");

const Egms = require("../models/egms");

const router = express.Router();

router.get("/", async (req, res) => {
  const egms = new Egms();
  const data = await egms.getAll();
  egms.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const egms = new Egms();
  const data = await egms.getOne(req.params.id);
  egms.close();

  if (!data || data.length < 1)
    return res.status(404).send("The egm with the given ID was not found");

  res.send(data);
});

module.exports = router;
