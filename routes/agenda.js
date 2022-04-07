const express = require("express");

const Agenda = require("../models/agenda");
const { companyAuth, auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", [companyAuth, auth], async (req, res) => {
  const agenda = new Agenda(req.company.db);
  const data = await agenda.getAll();
  agenda.close();

  res.send(data);
});

module.exports = router;
