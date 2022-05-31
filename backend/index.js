/** Import statements */
const express = require("express");
const cors = require("cors");
const config = require("config");
const dotenv = require("dotenv");

const agenda = require("./routes/agenda");
const answers = require("./routes/answers");
const auth = require("./routes/auth");
const company = require("./routes/company");
const downloads = require("./routes/downloads");
const faq = require("./routes/faq");
const proxy = require("./routes/proxy");
const user = require("./routes/user");

/** Check if `jwtPrivateKey` is set */
dotenv.config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

/** Middleware */
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/agenda", agenda);
app.use("/api/answers", answers);
app.use("/api/auth", auth);
app.use("/api/company", company);
app.use("/api/downloads", downloads);
app.use("/api/faq", faq);
app.use("/api/proxy", proxy);
app.use("/api/user", user);

/** Start the express server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));