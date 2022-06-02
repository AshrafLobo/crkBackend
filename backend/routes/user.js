const express = require("express");
const _ = require("lodash");

const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:phoneNo", [auth], async (req, res) => {
  const user = new User(req.user.db);
  const data = await user.getOne(req.params.phoneNo);
  user.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The user with the number ${req.params.phoneNo} does not exist`);

  res.send(_.pick(data[0], ["phoneNo", "full_name", "PaymentName", "email"]));
});

router.put("/:phoneNo", [auth], async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  const user = new User(req.user.db);
  let data = await user.getOne(req.params.phoneNo);

  if (!data || data.length == 0) {
    user.close();
    return res.status(404).send("User does not exists.");
  }

  data[0].full_name = req.body.name;
  data[0].phoneNo = req.body.phoneNo;
  data[0].email = req.body.email;
  data[0].PaymentName = req.body.paymentMethod;

  user.updateRecord(data[0], req.params.phoneNo);
  user.close();

  res.send(data[0]);
});

module.exports = router;
