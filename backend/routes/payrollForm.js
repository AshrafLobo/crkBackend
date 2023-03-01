const express = require("express");
const sanitizeHtml = require("sanitize-html");

const { PayrollForm, validate } = require("../models/payrollForm");

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

  Object.keys(req.body).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  const payrollForm = new PayrollForm();
  const data = await payrollForm.createRecord(sanitizedBody);
  payrollForm.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
