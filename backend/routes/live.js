const express = require("express");

const { Live } = require("../models/live");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const live = new Live(req.user.db);
  const data = await live.getAll();
  live.close();

  if (!data) return res.status(404).send("No live video found");

  res.send(data.at(-1));
});

module.exports = router;
