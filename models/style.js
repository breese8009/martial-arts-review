let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let School = require("./school");

let StyleSchema = new Schema({
  type: String,
  description: String,
  comments: String,
  link: String,
  schools: [{type: Schema.Types.ObjectId, ref: 'School'}],
});

let Style = mongoose.model("Style", StyleSchema);

module.exports = Style;
