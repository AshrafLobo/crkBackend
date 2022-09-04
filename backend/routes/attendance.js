const express = require("express");

const { Attendance, validate } = require("../models/attendance");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", [auth], async (req, res) => {
  const attendance = new Attendance(req.user.db);
  const data = await attendance.getOne(req.params.ID_RegCertNo);
  attendance.close();

  if (!data)
    return res.status(404).send("The attendee with the given ID was not found");

  res.send(data);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const isProxy = req.user.isProxy;

  const attendance = new Attendance(req.user.db);
  req.body["isProxy"] = isProxy;
  const data = await attendance.createRecord(req.body);
  attendance.close();

  if (!data.insertId) return res.status(500).send(data.message);

  res.send({ id: data.insertId, ...req.body });
});

module.exports = router;
