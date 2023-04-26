const express = require("express");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const { PayrollForm, validate } = require("../models/payrollForm");
const sendEmail = require("../common/sendMail");

const router = express.Router();

router.get("/", async (req, res) => {
  const payrollForms = await PayrollForm.findAll();
  res.send(payrollForms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payrollForm = await PayrollForm.findOne({ where: { id } });
    if (!payrollForm) {
      return res.status(404).send("The form was not found");
    }
    res.json(payrollForm);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
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

  try {
    const payrollForm = await PayrollForm.create({ ...sanitizedBody });
    sendEmail(
      output,
      "Payroll form request",
      "info@comp-rite.com, pay100@comp-rite.com"
    );

    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
