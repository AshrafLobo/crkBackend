const express = require("express");
const _ = require("lodash");

const { Company, validate } = require("../models/company");

const router = express.Router();

router.get("/", async (req, res) => {
  const company = new Company();
  let data = await company.getAll();
  company.close();

  data = _.map(data, _.partialRight(_.pick, ["id", "name", "db"]));

  res.send(data);
});

router.get("/:id", async (req, res) => {
  const company = new Company();
  const data = await company.getOne(req.params.id);
  company.close();

  if (!data || data.length == 0)
    return res
      .status(404)
      .send(`The company with the id ${req.body.id} does not exist`);

  res.send(data[0]);
});

module.exports = router;
