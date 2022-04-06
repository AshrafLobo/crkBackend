const express = require("express");
const config = require("config");

const company = require("./routes/company");
// const user = require("./routes/user");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const app = express();
app.use(express.json());

// app.use("/api/user", user);
// app.use("/api/auth", auth);
app.use("/api/company", company);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
