const express = require("express");
const _ = require("lodash");

const {
  Proxy,
  validate,
  validateProxy,
  validateCode,
  validateChangePin,
} = require("../models/proxy");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:phoneNo", [auth], async (req, res) => {
  const proxy = new Proxy(req.user.db);
  const data = await proxy.getOne(req.params.phoneNo);
  proxy.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The proxy with the number ${req.params.phoneNo} does not exist`);

  res.send(_.pick(data[0], ["phoneNo", "full_name", "email"]));
});

/** Create new proxy  */
router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.user.db);

  let data = await proxy.getProxy(req.body.users_MemberNo);
  if (data && data.length > 0)
    return res.status(400).send("Proxy already exists.");

  data = await proxy.createRecord(req.body);
  proxy.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({
    id: data.insertId,
    ...req.body,
  });
});

/** Route for proxy login */
router.post("/validate", async (req, res) => {
  const { error } = validateCode(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.body.db);
  let data = await proxy.getOne(req.body.phoneNo);

  if (!data || data.length == 0)
    return res.status(400).send("Invalid phone number or code");

  if (data[0].code != req.body.code)
    return res.status(400).send("Invalid phone number or code");

  const response = await proxy.updateRecord(
    { pin: proxy.generatePin() },
    data[0].phoneNo
  );
  proxy.close();

  res.send(response);
});

router.put("/changePin/:phoneNo", [auth], async (req, res) => {
  const { error } = validateChangePin(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.user.db);
  let data = await proxy.getOne(req.params.phoneNo);

  if (!data || data.length == 0) {
    proxy.close();
    return res.status(404).send("Proxy does not exists.");
  }

  if (data[0].pin != req.body.oldPin) {
    proxy.close();
    return res.status(400).send("Incorrect pin provided");
  }

  data[0].pin = req.body.newPin;
  proxy.updateRecord(data[0], req.params.phoneNo);
  proxy.close();

  res.send(data[0]);
});

router.put("/:phoneNo", [auth], async (req, res) => {
  const { error } = validateProxy(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.user.db);
  let data = await proxy.getOne(req.params.phoneNo);

  if (!data || data.length == 0) {
    proxy.close();
    return res.status(404).send("Proxy does not exists.");
  }

  data[0].full_name = req.body.name;
  data[0].phoneNo = req.body.phoneNo;
  data[0].email = req.body.email;

  proxy.updateRecord(data[0], req.params.phoneNo);
  proxy.close();

  res.send(data[0]);
});

module.exports = router;
