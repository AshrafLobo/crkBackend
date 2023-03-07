const express = require("express");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const { ContactUsForm, validate } = require("../models/contactUsForm");
const sendEmail = require("../common/sendMail");

const router = express.Router();

router.get("/", async (req, res) => {
  const contactUsForm = new ContactUsForm();
  const data = await contactUsForm.getAll();
  contactUsForm.close();

  if (!data) return res.status(404).send("There are no contact us forms found");

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const contactUsForm = new ContactUsForm();
  const data = await contactUsForm.getOne(req.params.id);
  contactUsForm.close();

  if (!data)
    return res
      .status(404)
      .send("The contact us form with the given ID was not found");

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
      "subject",
      "message",
    ])
  ).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });

  const { firstName, lastName, email, phoneNo, subject, message } =
    sanitizedBody;
  const output = `
  <p>CONTACT US FORM REQUEST</p>
  <h3>User Details</h3>
  <ol>
    <li>Name: ${firstName} ${lastName}</li>    
    <li>Email: ${email || "N/A"}</li>    
    <li>Phone number: ${phoneNo || "N/A"}</li>    
  </ol> 
  
  <h3>Subject: ${subject}</h3>
  <h3>Message</h3>
  <p>${message}</p>
`;

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  const contactUsForm = new ContactUsForm();
  const data = await contactUsForm.createRecord(sanitizedBody);
  contactUsForm.close();

  if (!data.insertId) return res.status(500).send(data.message);

  sendEmail(output, "Contact us form request", "info@comp-rite.com");
  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
