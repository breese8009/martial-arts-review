/*
 * DATABASE
 */

let db = require("../models");

//GET /api/styles -- get all the styles from db
//    controllers.styles.index
function index(req, res) {
  db.Style.find({}, function(err, foundStyles) {
    res.json(foundStyles);
  });
}

//POST /api/styles -- add a new style to db
//     controllers.styles.create
function create(req, res) {

}

//GET /api/styles/:styleId -- get a style based on the styleId
//    controllers.styles.show
function show(req, res) {

}

//PUT /api/styles/:styleId -- edit a style
//    controllers.styles.update
function update(req, res) {

}

//DELETE /api/styles/:styleId -- delete a style
//       controllers.styles.destroy
function destroy(req, res) {

}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy,
}
