const express = require("express");

const Egm = require("../models/egms");

const router = express.Router();

router.get("/", async (req, res) => {
  const egms = await Egm.findAll();
  res.send(egms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const egm = await Egm.findOne({ where: { id } });
    if (!egm) {
      return res.status(404).send("Egm not found");
    }
    res.json(egm);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
