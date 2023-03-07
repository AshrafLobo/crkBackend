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
  const shareRegistrationForm = new ShareRegistrationForm();
  const data = await shareRegistrationForm.getAll();
  shareRegistrationForm.close();

  if (!data)
    return res.status(404).send("There are no share registration forms found");

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const shareRegistrationForm = new ShareRegistrationForm();
  const data = await shareRegistrationForm.getOne(req.params.id);
  shareRegistrationForm.close();

  if (!data)
    return res
      .status(404)
      .send("The share registration form with the given ID was not found");

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
	message
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

  const shareRegistrationForm = new ShareRegistrationForm();
  const data = await shareRegistrationForm.createRecord(sanitizedBody);
  shareRegistrationForm.close();

  if (!data.insertId) return res.status(500).send(data.message);
  sendEmail(
    output,
    "Share registration form request",
    "info@comp-rite.com, shares@comp-rite.com, operations@comp-rite.com"
  );

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
