/*
 * DATABASE
 */

let db = require("../models");

//GET /api/styles/:styleId/schools -- get all the schools of the specified style
//    controllers.schools.index
function index(req, res) {
  console.log("Entering school index()");

  db.Style.findById(req.params.styleId, function(err, foundStyle) {
    if (err) {
      console.log(`school index() failed to find the style ${req.params.styleId} from the db`);
      res.send(404);
    }

    console.log(`found style: ${foundStyle} from the db`);

    //building array of schools from array of school Ids
    let schoolList =  foundStyle.schools.map(function(elem) {
      db.School.findById(elem, function(err, school) {
        if (!err) {
          return school;
        }
      });
    });
    res.json(schoolList);
  })

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


module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy,
}
