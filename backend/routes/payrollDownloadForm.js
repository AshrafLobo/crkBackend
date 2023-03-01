const express = require("express");
const sanitizeHtml = require("sanitize-html");

const {
  PayrollDownloadForm,
  validate,
} = require("../models/payrollDownloadForm");

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

  Object.keys(req.body).forEach((key) => {
    sanitizedBody[key] = sanitizeHtml(req.body[key]);
  });

  const { error } = validate(sanitizedBody);
  if (error) return res.status(400).send(error.details[0].message);

  const payrollDownloadForm = new PayrollDownloadForm();
  const data = await payrollDownloadForm.createRecord(sanitizedBody);
  payrollDownloadForm.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...sanitizedBody });
});

module.exports = router;
