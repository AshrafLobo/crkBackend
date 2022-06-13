const express = require("express");

const { Votes, validate } = require("../models/votes");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const votes = new Votes(req.user.db);
  const data = await votes.getAll();
  votes.close();

  res.send(data);
});

router.get("/:id", [auth], async (req, res) => {
  const votes = new Votes(req.user.db);
  const data = await votes.getOne(req.params.id);
  votes.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The answer with the id ${req.params.id} does not exist`);

  res.send(data);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const votes = new Votes(req.user.db);
  const data = await votes.createRecord(req.body);
  votes.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...req.body });
});

module.exports = router;
