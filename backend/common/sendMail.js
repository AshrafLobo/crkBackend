const config = require("config");
const nodemailer = require("nodemailer");

module.exports = async function (output, subject, receivers) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("user.user"),
      pass: config.get("user.pass"),
    },
  });

  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: `"Comprite Email" <${config.get("user.user")}>`, // sender address
      to: receivers, // list of receivers
      subject: subject, // Subject line
      html: output, // html body
    });

    console.log(`Message sent: ${info.messageId}`);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (ex) {
    throw ex;
  }
};
