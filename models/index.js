let mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/martialArtsReview");

module.exports = {
  Style: require("./style"),
  School: require("./school"),
};
