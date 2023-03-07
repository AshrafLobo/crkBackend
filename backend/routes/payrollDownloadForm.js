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
  const payrollDownloadForm = new PayrollDownloadForm();
  const data = await payrollDownloadForm.getAll();
  payrollDownloadForm.close();

  if (!data)
    return res.status(404).send("There are no payroll download forms found");

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const payrollDownloadForm = new PayrollDownloadForm();
  const data = await payrollDownloadForm.getOne(req.params.id);
  payrollDownloadForm.close();

  if (!data)
    return res
      .status(404)
      .send("The payroll download form with the given ID was not found");

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
      "noOfEmployees",
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
    noOfEmployees,
  } = sanitizedBody;
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

  const payrollDownloadForm = new PayrollDownloadForm();
  const data = await payrollDownloadForm.createRecord(sanitizedBody);
  payrollDownloadForm.close();

  if (!data.insertId) return res.status(500).send(data.message);
  sendEmail(
    output,
    "Payroll download form request",
    "info@comp-rite.com, pay100@comp-rite.com"
  );

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
