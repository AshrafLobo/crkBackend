const express = require("express");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const { PayrollForm, validate } = require("../models/payrollForm");
const sendEmail = require("../common/sendMail");

const router = express.Router();

router.get("/", async (req, res) => {
  const payrollForm = new PayrollForm();
  const data = await payrollForm.getAll();
  payrollForm.close();

  if (!data) return res.status(404).send("There are no payroll forms found");

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const payrollForm = new PayrollForm();
  const data = await payrollForm.getOne(req.params.id);
  payrollForm.close();

  if (!data)
    return res
      .status(404)
      .send("The payroll form with the given ID was not found");

  res.send(data);
});

router.post("/", async (req, res) => {
  const sanitizedBody = {};

  Object.keys(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "phoneNo",
      "company",
      "jobTitle",
      "noOfEmployees",
      "enquireAbout",
      "message",
    ])
  ).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });

  const {
    firstName,
    lastName,
    email,
    phoneNo,
    company,
    jobTitle,
    noOfEmployees,
    enquireAbout,
    message,
  } = sanitizedBody;
  const output = `
  <p>PAYROLL FORM REQUEST</p>
  <h3>User Details</h3>
  <ol>
    <li>Name: ${firstName} ${lastName}</li>    
    <li>Email: ${email || "N/A"}</li>    
    <li>Phone number: ${phoneNo || "N/A"}</li>    
  </ol> 
  
  <h3>Company Details</h3>
  <ol>
    <li>Company: ${company || "N/A"}</li>
    <li>Job title: ${jobTitle || "N/A"}</li>    
    <li>Number of employees: ${noOfEmployees || "N/A"}</li>
  </ol>

  <h3>ENQURE ABOUT: ${enquireAbout}</h3>
  <h3>Message</h3>
  <p>${message}</p>
`;

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  const payrollForm = new PayrollForm();
  const data = await payrollForm.createRecord(sanitizedBody);
  payrollForm.close();

  if (!data.insertId) return res.status(500).send(data.message);
  sendEmail(
    output,
    "Payroll form request",
    "info@comp-rite.com, pay100@comp-rite.com"
  );

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
