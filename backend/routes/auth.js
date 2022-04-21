const express = require("express");

const { User, validate } = require("../models/user");
const { Proxy } = require("../models/proxy");

const router = express.Router();

/** Login route */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body.db);
  let data = await user.getOne(req.body.phoneNo);
  user.close();

  /** Check if user is a proxy */
  if (!data || data.length == 0) {
    const proxy = new Proxy(req.body.db);
    data = await proxy.getOne(req.body.phoneNo);
    proxy.close();

    if (!data || data.length == 0)
      return res.status(400).send("Invalid phone number or pin");
  }

  if (data[0].pin != req.body.pin)
    return res.status(400).send("Invalid phone number or pin");

  const token = user.generateToken({ ...data[0], db: req.body.db });
  res.send(token);
});

module.exports = router;
