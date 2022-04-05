const express = require("express");
const _ = require("lodash");
const Joi = require("joi");

const AgmModel = require("../models/agm");

const router = express.Router();

db = new AgmModel();

router.get("/", async (req, res) => {
  const data = await db.getAllData();
  res.send(data);
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const data = await db.getAgmData(req.body.id);
  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The company with the id ${req.body.id} does not exist.`);

  data[0].db;
});

module.exports = router;
