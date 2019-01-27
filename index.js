let mongoose = require("mongoose");
const server = "0.0.0.0:27017"; // REPLACE WITH YOUR DB SERVER
const database = "hookah"; // REPLACE WITH YOUR DB NAME
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(
        `mongodb://${server}/${database}`,
        { useNewUrlParser: true }
      )
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

const InfoSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: String
});

var InfoModel = mongoose.model("info", InfoSchema, "info");

InfoModel.findOne().then(response => {
  console.log(response);
});
