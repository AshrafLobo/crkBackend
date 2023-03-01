const express = require("express");
const sanitizeHtml = require("sanitize-html");

const { ContactUsForm, validate } = require("../models/contactUsForm");

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

  Object.keys(req.body).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  const contactUsForm = new ContactUsForm();
  const data = await contactUsForm.createRecord(sanitizedBody);
  contactUsForm.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
