let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SchoolSchema = new Schema({
  name: String,
  address: String,
  link: String,
  image: String,
});

let School = mongoose.model("School", SchoolSchema);

module.exports = School;
