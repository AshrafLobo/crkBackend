const express = require("express");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const {
  ShareRegistrationForm,
  validate,
} = require("../models/shareRegistrationForm");
const sendEmail = require("../common/sendMail");

const router = express.Router();

router.get("/", async (req, res) => {
  const shareRegistrationForms = await ShareRegistrationForm.findAll();
  res.send(shareRegistrationForms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const shareRegistrationForm = await ShareRegistrationForm.findOne({
      where: { id },
    });
    if (!shareRegistrationForm) {
      return res.status(404).send("The form was not found");
    }
    res.json(shareRegistrationForm);
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
      "address",
      "idNumber",
      "cdscNumber",
      "company",
      "service",
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
    address,
    idNumber,
    cdscNumber,
    company,
    service,
    message,
  } = sanitizedBody;
  const output = `
  <p>SHARE REGISTRATION FORM REQUEST</p>
  <h3>User Details</h3>
  <ol>
    <li>Name: ${firstName} ${lastName}</li>    
    <li>Email: ${email || "N/A"}</li>    
    <li>Phone number: ${phoneNo || "N/A"}</li>    
    <li>Address: ${address || "N/A"}</li>    
    <li>ID Number: ${idNumber}</li>    
    <li>CDSC Number: ${cdscNumber || "N/A"}</li>    
  </ol> 

  <h3>SERVICE: ${service}</h3>
  <p><strong>Company associated with service:</strong> ${company}</p>

  <h3>Message</h3>
  <p>${message}</p>
`;
  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const shareRegistrationForm = await ShareRegistrationForm.create({
      ...sanitizedBody,
    });
    sendEmail(
      output,
      "Share registration form request",
      "info@comp-rite.com, shares@comp-rite.com, operations@comp-rite.com"
    );
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
