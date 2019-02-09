let mongoose = require("mongoose");
const express = require("express");
const app = express();
const server = "0.0.0.0:27017"; // REPLACE WITH YOUR DB SERVER
const database = "meat"; // REPLACE WITH YOUR DB NAME
const nodemailer = require("nodemailer");
const transporter = require("./utils/transporter");
const bodyParser = require("body-parser");

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }
}

var dataBase = new Database();

dataBase._connect();

var Schema = mongoose.Schema;

const CompanySchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String
});

const MeatSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  key: String,
  label: String,
  products: [
    {
      label: String,
      price: Number,
      company: String
    }
  ]
});

const CompanyModel = mongoose.model("companies", CompanySchema, "companies");
const MeatModel = mongoose.model("meat", MeatSchema, "meat");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("/getTitle", (req, res) => {
//   CompanyModel.findOne().then(response => {
//     res.send(response.title);
//   });
// });

app.get("/getCompanies", (req, res) => {
  CompanyModel.find().then(companies => {
    res.send(companies);
  });
});

app.get("/getMeat", (req, res) => {
  MeatModel.find().then(meat => {
    res.send(meat);
  });
});

app.get("/getChicken", (req, res) => {
  MeatModel.findOne({ key: "chicken" }).then(chicken => {
    res.send(chicken);
  });
});

app.post("/callback", (req, res) => {
  console.log("req =", req.body);
  // setup email data with unicode symbols
  let mailOptions = {
    from: "meatmailar@gmail.com", // sender address
    to: "meatmailar@gmail.com", // list of receivers
    subject: "Обратный звонок", // Subject line
    html: `<p>Телефон: <br /> ${req.body.callbackPhone}</p><p>Имя: <br /> ${
      req.body.name
    }</p>` // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  res.send("Success!!!");
});

app.listen(8009, () => {
  console.log("Ну здарова");
  // InfoModel.findOne().then(response => {
  //   console.log(response.title);
  // });
});
