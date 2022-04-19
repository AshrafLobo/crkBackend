const express = require("express");

const { Proxy, validate, validateCode } = require("../models/proxy");
const { companyAuth, auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", [companyAuth, auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.company.db);

  let data = await proxy.getOne(req.body.phoneNo);
  if (data && data.length > 0)
    return res.status(400).send("Proxy already exists.");

  data = await proxy.createRecord({
    ...req.body,
    users_MemberNo: req.user.MemberNo,
  });
  proxy.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({
    id: data.insertId,
    ...req.body,
    users_MemberNo: req.user.MemberNo,
  });
});

router.post("/validate", [companyAuth, auth], async (req, res) => {
  const { error } = validateCode(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.company.db);
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

module.exports = router;
