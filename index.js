const express = require("express");

const auth = require("./routes/auth");
const company = require("./routes/company");

const app = express();
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/company", company);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
