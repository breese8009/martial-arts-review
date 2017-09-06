/*
 * DATABASE
 */

let db = require("../models");

//GET /api/styles/:styleId/schools -- get all the schools of the specified style
//    controllers.schools.index
function index(req, res) {

}

//POST /api/styles/:styleId/schools -- create a school then add it to a style
//     controllers.schools.create
function create(req, res) {

}

//PUT /api/styles/:styleId/schools/:schoolId
//    controllers.schools.update
function update(req, res) {

}

//DELETE /api/styles/:styleId/schools/:schoolId
//       controllers.schools.destroy
function destroy(req, res) {

}


modules.export = {
  index: index,
  create: create,
  update: update,
  destroy: destroy,
}
