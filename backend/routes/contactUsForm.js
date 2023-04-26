const express = require("express");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const { ContactUsForm, validate } = require("../models/contactUsForm");
const sendEmail = require("../common/sendMail");

const router = express.Router();

router.get("/", async (req, res) => {
  const contactUsForms = await ContactUsForm.findAll();
  res.send(contactUsForms);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const contactUsForm = await ContactUsForm.findOne({ where: { id } });
    if (!contactUsForm) {
      return res.status(404).send("The form was not found");
    }
    res.json(contactUsForm);
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

  try {
    const contactUsForm = await ContactUsForm.create({ ...sanitizedBody });
    sendEmail(output, "Contact us form request", "info@comp-rite.com");
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
