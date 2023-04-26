const express = require("express");

const Agm = require("../models/agms");

const router = express.Router();

router.get("/", async (req, res) => {
  const agms = await Agm.findAll();
  res.send(agms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const agm = await Agm.findOne({ where: { id } });
    if (!agm) {
      return res.status(404).send("Agm not found");
    }
    res.json(agm);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
