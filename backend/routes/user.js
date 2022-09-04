const express = require("express");
const _ = require("lodash");

const { User, validateUser, validateChangePin } = require("../models/user");
const { Proxy } = require("../models/proxy");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:ID_RegCert_No", [auth], async (req, res) => {
  const user = new User(req.user.db);
  const data = await user.getOne(req.params.ID_RegCert_No);
  user.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The user with the ID ${req.params.ID_RegCert_No} does not exist`);

  res.send(
    _.pick(data[0], [
      "ID_RegCert_No",
      "phoneNo",
      "full_name",
      "email",
      "MemberNo",
      "live_token",
    ])
  );
});

router.get("/getProxy/:ID_RegCert_No", [auth], async (req, res) => {
  const proxy = new Proxy(req.user.db);
  const data = await proxy.getProxy(req.params.ID_RegCert_No);
  proxy.close();

  if (!data || data.length == 0) return;

  res.send(
    _.pick(data[0], ["ID_RegCert_No", "full_name", "email", "MemberNo"])
  );
});

router.put("/:ID_RegCert_No", [auth], async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  const user = new User(req.user.db);
  let data = await user.getOne(req.params.ID_RegCert_No);

  if (!data || data.length == 0) {
    user.close();
    return res.status(404).send("User does not exists.");
  }

  data[0].full_name = req.body.name;
  data[0].ID_RegCert_No = req.body.ID_RegCert_No;
  data[0].email = req.body.email;
  data[0].PaymentName = req.body.paymentMethod;

  user.updateRecord(data[0], req.params.ID_RegCert_No);
  user.close();

  res.send(data[0]);
});

router.put("/changePin/:ID_RegCert_No", [auth], async (req, res) => {
  const { error } = validateChangePin(req.body);
  if (error) return res.status(400).send(error.message);

  const user = new User(req.user.db);
  let data = await user.getOne(req.params.ID_RegCert_No);

  if (!data || data.length == 0) {
    user.close();
    return res.status(404).send("User does not exists.");
  }

  if (data[0].pin != req.body.oldPin) {
    user.close();
    return res.status(400).send("Incorrect pin provided");
  }

  data[0].pin = req.body.newPin;
  user.updateRecord(data[0], req.params.ID_RegCert_No);
  user.close();

  res.send(data[0]);
});

module.exports = router;
