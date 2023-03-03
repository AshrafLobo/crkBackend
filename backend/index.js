/** Import statements */
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const config = require("config");
const helmet = require("helmet");
const compression = require("compression");

/** Route imports */
const agenda = require("./routes/agenda");
const agms = require("./routes/agms");
const answers = require("./routes/answers");
const auth = require("./routes/auth");
const attendance = require("./routes/attendance");
const dividends = require("./routes/dividends");
const company = require("./routes/company");
const contactUsForm = require("./routes/contactUsForm");
const egms = require("./routes/egms");
const faq = require("./routes/faq");
const issuers = require("./routes/issuers");
const live = require("./routes/live");
const news = require("./routes/news");
const payrollForm = require("./routes/payrollForm");
const payrollDownloadForm = require("./routes/payrollDownloadForm");
const proxy = require("./routes/proxy");
const resources = require("./routes/resources");
const shareRegistrationForm = require("./routes/shareRegistrationForm");
const timelines = require("./routes/timelines");
const user = require("./routes/user");
const votes = require("./routes/votes");

/** Check if `jwtPrivateKey` is set */
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

/** Middleware */
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

/** Route configurations */
app.use("/api/images", express.static("./images"));
app.use("/api/agenda", agenda);
app.use("/api/agms", agms);
app.use("/api/answers", answers);
app.use("/api/auth", auth);
app.use("/api/attendance", attendance);
app.use("/api/company", company);
app.use("/api/contactUsForms", contactUsForm);
app.use("/api/dividends", dividends);
app.use("/api/download", express.static("./downloads"));
app.use("/api/egms", egms);
app.use("/api/faq", faq);
app.use("/api/issuers", issuers);
app.use("/api/live", live);
app.use("/api/news", news);
app.use("/api/payrollForms", payrollForm);
app.use("/api/payrollDownloadForms", payrollDownloadForm);
app.use("/api/proxy", proxy);
app.use("/api/resources", resources);
app.use("/api/shareRegistrationForms", shareRegistrationForm);
app.use("/api/timelines", timelines);
app.use("/api/user", user);
app.use("/api/votes", votes);

/** Start the express server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
