const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "meatmailar@gmail.com",
    pass: "Alislo123"
  }
});

module.exports = transporter;
