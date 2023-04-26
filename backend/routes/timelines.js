const express = require("express");

const Timeline = require("../models/timelines");

const router = express.Router();

router.get("/", async (req, res) => {
  const timelines = await Timeline.findAll();
  res.send(timelines);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const timeline = await Timeline.findOne({ where: { id } });
    if (!timeline) {
      return res.status(404).send("Timeline not found");
    }
    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
