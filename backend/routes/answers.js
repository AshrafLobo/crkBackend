const express = require("express");

const { Answers, validate } = require("../models/answers");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const answers = new Answers(req.user.db);
  const data = await answers.getAll();
  answers.close();

  res.send(data);
});

router.get("/:id", [auth], async (req, res) => {
  const answers = new Answers(req.user.db);
  const data = await answers.getOne(req.params.id);
  answers.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The answer with the id ${req.params.id} does not exist`);

  res.send(data);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const answers = new Answers(req.user.db);
  const data = await answers.createRecord(req.body);
  answers.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...req.body });
});

module.exports = router;
