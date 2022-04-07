const express = require("express");

const Downloads = require("../models/downloads");
const { companyAuth, auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", [companyAuth, auth], async (req, res) => {
  const downloads = new Downloads(req.company.db);
  const data = await downloads.getAll();
  downloads.close();

  res.send(data);
});

router.get("/:id", [companyAuth, auth], async (req, res) => {
  const downloads = new Downloads(req.company.db);
  const data = await downloads.getOne(req.params.id);
  downloads.close();

  if (!data)
    return res
      .status(404)
      .send("The resources with the given ID was not found");

  res.send(data);
});

module.exports = router;
