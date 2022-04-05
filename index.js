const express = require("express");

const agm = require("./routes/agm");
const DbService = require("./dbService");

const app = express();
app.use(express.json());

let conn = new DbService();

app.use("/api/agm", agm);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
