let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/martialArtsReview");

module.exports = {
  Style: require("./style"),
  School: require("./school"),
};
