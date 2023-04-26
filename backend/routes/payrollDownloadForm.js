const express = require("express");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const {
  PayrollDownloadForm,
  validate,
} = require("../models/payrollDownloadForm");
const sendEmail = require("../common/sendMail");

const router = express.Router();

router.get("/", async (req, res) => {
  const payrollDownloadForms = await PayrollDownloadForm.findAll();
  res.send(payrollDownloadForms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payrollDownloadForm = await PayrollDownloadForm.findOne({
      where: { id },
    });
    if (!payrollDownloadForm) {
      return res.status(404).send("The form was not found");
    }
    res.json(payrollDownloadForm);
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
      "noOfEmployees",
    ])
  ).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });
  const { firstName, lastName, email, phoneNo, company, noOfEmployees } =
    sanitizedBody;
  const output = `
  <p>PAYROLL DOWNLOAD FORM REQUEST</p>
  <h3>User Details</h3>
  <ol>
    <li>Name: ${firstName} ${lastName}</li>    
    <li>Email: ${email || "N/A"}</li>    
    <li>Phone number: ${phoneNo || "N/A"}</li>    
  </ol> 
  
  <h3>Company Details</h3>
  <ol>
    <li>Company: ${company}</li>
    <li>Number of employees: ${noOfEmployees || "N/A"}</li>
  </ol>
`;

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const payrollDownloadForm = await PayrollDownloadForm.create({
      ...sanitizedBody,
    });
    sendEmail(
      output,
      "Payroll download form request",
      "info@comp-rite.com, pay100@comp-rite.com"
    );
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
