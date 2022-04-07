const express = require("express");

const { companyAuth } = require("../middleware/auth");
const { User, validate } = require("../models/user");

const router = express.Router();

/** Login route */
router.post("/", [companyAuth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.company.db);
  const data = await user.getOne(req.body.number);
  user.close();

  if (!data || data.length == 0)
    return res.status(400).send("Invalid phone number or pin");

  if (data[0].pin != req.body.pin)
    return res.status(400).send("Invalid phone number or pin");

  const token = user.generateToken(data[0]);
  res.send(token);
});

module.exports = router;
