const express = require("express");

const User = require("../models/user");
const { companyAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {});

router.get("/", [companyAuth], async (req, res) => {
  const user = new User(req.company.db, "users");
  const data = await user.getAll();
  user.close();

  console.log(data);
});

module.exports = router;
