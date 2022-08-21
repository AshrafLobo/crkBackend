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
const sendMail = require("../common/sendMail");

const router = express.Router();

router.get("/:ID_RegCert_No", [auth], async (req, res) => {
  const proxy = new Proxy(req.user.db);
  const data = await proxy.getOne(req.params.ID_RegCert_No);
  proxy.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The proxy with the ID ${req.params.ID_RegCert_No} does not exist`);

  res.send(_.pick(data[0], ["ID_RegCert_No", "full_name", "email"]));
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

  const output = `
    <h3>YOU HAVE BEEN SET AS A PROXY</h3>
    <p>You have been set as a proxy to attend the ${req.user.company} 2022 AGM on 15th Aug 2022 by:</p>
    <b>
      <ul>
        <li>User name: ${req.user.full_name}</li>
        <li>User email: ${req.user.email}</li>
      </ul>
    </b>

    <p>The AGM meeting will be held virtually.</p>
    <p>You are required to confirm that you received this email by going to the site <em>https://secure.comp-rite.co.ke/register/login/</em> to complete your registration.</p>
    <p>Enter the code  and details bellow to verify and recieve your pin</p>

    <h4>Verification credentials<h4/>

    <b>
      <ul>
        <li>ID Number/ Passport Number: ${req.body.ID_RegCert_No}</li>
        <li>Verification code: ${req.body.code}</li>
      </ul>
    </b>
  `;
  sendMail(output, "COMPRITE PROXY INVITE", req.body.email);

  const output2 = `
    <h3>YOU HAVE SUCCESSFULLY SET A PROXY</h3>
    <p>You have set:</p>

    <b>
      <ul>
        <li>ID Number/ Passport Number: ${req.body.ID_RegCert_No}</li>
        <li>Proxy name: ${req.body.full_name}</li>
        <li>Proxy email: ${req.body.email}</li>
      </ul>
    </b>

    <p>as your proxy to attend the ${req.user.company} 2022 AGM on 15th Aug 2022.</p>

    <p>The AGM meeting will be held virtually.</p>
    <p>We have notified your proxy that he/she has been added.</p>
    <p>Please ensure that your proxy completes registration at <em>https://secure.comp-rite.co.ke/register/login/</em> otherwise he/she will be unable to attend the meeting.</p>
  `;
  sendMail(output2, "COMPRITE PROXY NOTIFICATION", req.user.email);

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
  let data = await proxy.getOne(req.body.ID_RegCert_No);

  if (!data || data.length == 0)
    return res.status(400).send("Invalid ID Number or code");

  if (data[0].code != req.body.code)
    return res.status(400).send("Invalid ID Number or code");

  const pin = proxy.generatePin();
  const response = await proxy.updateRecord({ pin }, data[0].ID_RegCert_No);
  proxy.close();

  const output = `
    <h3>AGM LOGIN DETAILS</h3>
    <p>The following are the login details to access the AGM Registration.</p>
    <p>Please go to <em>https://secure.comp-rite.co.ke/register/login/</em> to complete your registration</p>

    <b>
      <ul>
        <li>ID Number/ Passport Number: ${data[0].ID_RegCert_No}</li>    
        <li>Pin: ${pin}</li>    
      </ul>
    </b> 
    `;

  sendMail(output, "AGM LOGIN DETAILS", data[0].email);

  res.send(response);
});

router.put("/changePin/:ID_RegCert_No", [auth], async (req, res) => {
  const { error } = validateChangePin(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.user.db);
  let data = await proxy.getOne(req.params.ID_RegCert_No);

  if (!data || data.length == 0) {
    proxy.close();
    return res.status(404).send("Proxy does not exists.");
  }

  if (data[0].pin != req.body.oldPin) {
    proxy.close();
    return res.status(400).send("Incorrect pin provided");
  }

  data[0].pin = req.body.newPin;
  proxy.updateRecord(data[0], req.params.ID_RegCert_No);
  proxy.close();

  res.send(data[0]);
});

router.put("/:ID_RegCert_No", [auth], async (req, res) => {
  const { error } = validateProxy(req.body);
  if (error) return res.status(400).send(error.message);

  const proxy = new Proxy(req.user.db);
  let data = await proxy.getOne(req.params.ID_RegCert_No);

  if (!data || data.length == 0) {
    proxy.close();
    return res.status(404).send("Proxy does not exists.");
  }

  data[0].full_name = req.body.name;
  data[0].phoneNo = req.body.ID_RegCert_No;
  data[0].email = req.body.email;

  proxy.updateRecord(data[0], req.params.ID_RegCert_No);
  proxy.close();

  res.send(data[0]);
});

module.exports = router;
