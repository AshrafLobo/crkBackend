const express = require("express");

const Faq = require("../models/faq");
const { companyAuth, auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", [companyAuth, auth], async (req, res) => {
  const faq = new Faq(req.company.db);
  const data = await faq.getAll();
  faq.close();

  res.send(data);
});

router.get("/:id", [companyAuth, auth], async (req, res) => {
  const faq = new Faq(req.company.db);
  const data = await faq.getOne(req.params.id);
  faq.close();

  if (!data)
    return res.status(404).send("The faq with the given ID was not found");

  res.send(data);
});

module.exports = router;
