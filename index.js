/** Import statements */
const express = require("express");
const config = require("config");
const dotenv = require("dotenv");

const auth = require("./routes/auth");
const agenda = require("./routes/agenda");
const company = require("./routes/company");
const downloads = require("./routes/downloads");

/** Check if `jwtPrivateKey` is set */
dotenv.config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

/** Middleware */
const app = express();
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/agenda", agenda);
app.use("/api/company", company);
app.use("/api/downloads", downloads);

/** Start the express server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
