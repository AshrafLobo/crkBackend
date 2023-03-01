const express = require("express");
const sanitizeHtml = require("sanitize-html");

const {
  ShareRegistrationForm,
  validate,
} = require("../models/shareRegistrationForm");

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

  Object.keys(req.body).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  const shareRegistrationForm = new ShareRegistrationForm();
  const data = await shareRegistrationForm.createRecord(sanitizedBody);
  shareRegistrationForm.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
