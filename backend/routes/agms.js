const express = require("express");

const Agms = require("../models/agms");

const router = express.Router();

router.get("/", async (req, res) => {
  const agms = new Agms();
  const data = await agms.getAll();
  agms.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const agms = new Agms();
  const data = await agms.getOne(req.params.id);
  agms.close();

  if (!data || data.length < 1)
    return res.status(404).send("The agm with the given ID was not found");

  res.send(data);
});

module.exports = router;
