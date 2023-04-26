/** Import statements */
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { connect } = require("./connection");

/** Route imports */
const agms = require("./routes/agms");
const dividends = require("./routes/dividends");
const contactUsForm = require("./routes/contactUsForm");
const egms = require("./routes/egms");
const featuredDownloads = require("./routes/featuredDownloads");
const featuredPosts = require("./routes/featuredPosts");
const issuers = require("./routes/issuers");
const news = require("./routes/news");
const payrollForm = require("./routes/payrollForm");
const payrollDownloadForm = require("./routes/payrollDownloadForm");
const shareRegistrationForm = require("./routes/shareRegistrationForm");
const timelines = require("./routes/timelines");

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
app.use("/api/agms", agms);
app.use("/api/contactUsForms", contactUsForm);
app.use("/api/dividends", dividends);
app.use("/api/downloads", express.static("./downloads"));
app.use("/api/egms", egms);
app.use("/api/featuredDownloads", featuredDownloads);
app.use("/api/featuredPosts", featuredPosts);
app.use("/api/issuers", issuers);
app.use("/api/news", news);
app.use("/api/payrollForms", payrollForm);
app.use("/api/payrollDownloadForms", payrollDownloadForm);
app.use("/api/shareRegistrationForms", shareRegistrationForm);
app.use("/api/timelines", timelines);

/** Start the express server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
  connect();
});
