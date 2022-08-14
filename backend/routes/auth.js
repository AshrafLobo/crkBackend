const express = require("express");

const { User, validate, validateCheckPin } = require("../models/user");
const { Proxy } = require("../models/proxy");
const { Company } = require("../models/company");
const sendMail = require("../common/sendMail");

const router = express.Router();

router.post("/checkPin", async (req, res) => {
  const { error } = validateCheckPin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body.db);
  let data = await user.getOne(req.body.ID_RegCert_No);

  let isProxy = false;
  let hasPin = false;

  /** Check if user is a proxy */
  if (!data || data.length == 0) {
    const proxy = new Proxy(req.body.db);
    data = await proxy.getOne(req.body.ID_RegCert_No);
    proxy.close();

    if (!data || data.length == 0)
      return res.status(400).send("User does not exist");

    isProxy = true;
  }

  /** Return true if pin has been set */
  if (data[0].pin) hasPin = true;

  /** Generate pin if user is not a proxy */
  if (!hasPin && !isProxy) {
    const pin = user.generatePin();

    const response = await user.updateRecord({ pin }, data[0].ID_RegCert_No);

    const output = `
    <h3>AGM LOGIN DETAILS</h3>
    <p>The following are the login details to access the AGM Registration.</p>
    
    <b>
      <ul>
        <li>ID Number/ Passport Number: ${data[0].ID_RegCert_No}</li>    
        <li>Pin: ${pin}</li>    
      </ul>
    </b> 
    `;

    sendMail(output, "AGM LOGIN DETAILS", data[0].email);
  }

  user.close();
  res.send({ hasPin, isProxy });
});

/** Login route */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body.db);
  let data = await user.getOne(req.body.ID_RegCert_No);
  user.close();

  const company = new Company();
  let companyData = await company.getOneWithDb(req.body.db);
  company.close();

  let isProxy = false;

  /** Check if user is a proxy */
  if (!data || data.length == 0) {
    const proxy = new Proxy(req.body.db);
    data = await proxy.getOne(req.body.ID_RegCert_No);
    proxy.close();

    if (!data || data.length == 0)
      return res.status(400).send("Invalid ID number or pin");

    isProxy = true;
  }

  if (data[0].pin != req.body.pin)
    return res.status(400).send("Invalid ID number or pin");

  const token = user.generateToken({
    ...data[0],
    company: companyData[0].name,
    db: req.body.db,
    isProxy,
  });
  res.send(token);
});

module.exports = router;
