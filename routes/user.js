const express = require("express");

const User = require("../models/user");
const { companyAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", [companyAuth], async (req, res) => {
  const user = new User(req.company.db);
  const data = await user.getAll();
  user.close();

  res.send(data);
});

module.exports = router;
