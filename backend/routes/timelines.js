const express = require("express");

const Timelines = require("../models/timelines");

const router = express.Router();

router.get("/", async (req, res) => {
  const timelines = new Timelines();
  const data = await timelines.getAll();
  timelines.close();

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const timelines = new Timelines();
  const data = await timelines.getOne(req.params.id);
  timelines.close();

  if (!data || data.length < 1)
    return res.status(404).send("The timeline with the given ID was not found");

  res.send(data);
});

module.exports = router;
