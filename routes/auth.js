const express = require("express");
const Joi = require("joi");

const router = express.Router();

router.post("/", (req, res) => {
  const schema = Joi.object({
    number: Joi.string().length(12).required(),
    pin: Joi.number().length(4),
  });
});

module.exports = router;
