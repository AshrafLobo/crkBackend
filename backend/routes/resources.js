const express = require("express");

const Resources = require("../models/resources");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const resources = new Resources(req.user.db);
  const data = await resources.getAll();
  resources.close();

  res.send(data);
});

router.get("/live_link", [auth], async (req, res) => {
  const resources = new Resources(req.user.db);
  const data = await resources.getLiveLink();
  resources.close();

  res.send(data[0]);
});

router.get("/:id", [auth], async (req, res) => {
  const resources = new Resources(req.user.db);
  const data = await resources.getOne(req.params.id);
  resources.close();

  if (!data)
    return res
      .status(404)
      .send("The resources with the given ID was not found");

  res.send(data);
});

router.get("/:id/download", [auth], async (req, res) => {
  const downloads = new Resources(req.user.db);
  const data = await downloads.getOne(req.params.id);
  downloads.close();

  if (!data)
    return res
      .status(404)
      .send("The resources with the given ID was not found");

  const fileURL = `../ussd_dashboard/uploads/${data[0].file_name}`;
  res.download(fileURL, data[0].file_name);
});

module.exports = router;
