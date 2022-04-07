const express = require("express");

const { Company, validate } = require("../models/company");

const router = express.Router();

router.get("/", async (req, res) => {
  const company = new Company();
  const data = await company.getAll();
  company.close();

  res.send(data);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const company = new Company();
  const data = await company.getOne(req.body.id);
  company.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The company with the id ${req.body.id} does not exist`);

  const token = company.generateCompanyToken(data[0]);
  res.send(token);
});

module.exports = router;
