const express = require("express");

const Agenda = require("../models/agenda");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const agenda = new Agenda(req.user.db);
  const data = await agenda.getAll();
  agenda.close();

  res.send(data);
});

module.exports = router;
