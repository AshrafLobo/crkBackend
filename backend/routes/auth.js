const express = require("express");

const { User, validate, validateCheckPin } = require("../models/user");
const { Proxy } = require("../models/proxy");

const router = express.Router();

router.post("/checkPin", async (req, res) => {
  const { error } = validateCheckPin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body.db);
  let data = await user.getOne(req.body.phoneNo);
  user.close();

  let isProxy = false;
  let hasPin = true;

  /** Check if user is a proxy */
  if (!data || data.length == 0) {
    const proxy = new Proxy(req.body.db);
    data = await proxy.getOne(req.body.phoneNo);
    proxy.close();

    if (!data || data.length == 0)
      return res.status(400).send("User does not exist");

    isProxy = true;
  }

  /** Return true if pin has not been set */
  if (!data[0].pin) hasPin = false;

  res.send({ hasPin, isProxy });
});

/** Login route */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body.db);
  let data = await user.getOne(req.body.phoneNo);
  user.close();

  let isProxy = false;

  /** Check if user is a proxy */
  if (!data || data.length == 0) {
    const proxy = new Proxy(req.body.db);
    data = await proxy.getOne(req.body.phoneNo);
    proxy.close();

    if (!data || data.length == 0)
      return res.status(400).send("Invalid phone number or pin");

    isProxy = true;
  }

  if (data[0].pin != req.body.pin)
    return res.status(400).send("Invalid phone number or pin");

  const token = user.generateToken({ ...data[0], db: req.body.db, isProxy });
  res.send(token);
});

module.exports = router;
