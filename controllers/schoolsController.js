/*
 * DATABASE
 */

let db = require("../models");

//GET /api/schools -- get all schools(not style-dependent)
function getallschools(req, res) {
  console.log("Engering school getallschools()");

  db.School.find({}, function(err, schools) {
    res.json(schools);
  });
}

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
    let schoolList = [];

    foundStyle.schools.forEach(function(schoolId) {
      db.School.findById(schoolId, function(err, school) {
        if (!err) {
          schoolList.push(school);
        }
      });
    });

    console.log(`school index(): style = "${foundStyle}", schools = ${schoolList}`);
    console.log("school index(): successful");
    res.json(schoolList);
  });
}

//POST /api/styles/:styleId/schools -- create a school then add it to a style
//     controllers.schools.create
function create(req, res) {
  console.log("Entering school create()");

  db.School.create(req.body, function(err, newSchool) {
    if (err) {
      console.log(`school create() failed with err = ${err}`);
      res.send(404);
    }

    console.log(`new school ${newSchool} created`);

    //search the db for the style we want to add the new school to
    db.Style.findById(req.params.styleId, function(err, style) {
      if (err) {
        console.log(`could not find style id ${req.params.styleId} in db`);
        res.send(404);
      }

      console.log(`found style ${style} for new school ${newSchool}.`);
      style.schools.push(newSchool);
      console.log("school create(): successful");
      res.json(newSchool);
    });
  });
}

//PUT /api/styles/:styleId/schools/:schoolId
//    controllers.schools.update
function update(req, res) {
  console.log("Entering school update()");

  db.Style.findById(req.params.styleId, function(err, style) {
    if (err) {
      console.log(`failed to find style id({$req.params.styleId}) in db`);
      res.send(404);
    }

    console.log(`found style ${style} in db`);
    db.School.findById(req.params.schoolId, function(err, school) {
      if (err) {
        console.log(`failed to find school id (${req.params.schoolId}) in db`);
        res.send(404);
      }

      console.log(`found school ${school} in db`);
      school.name = req.body.name;
      school.address = req.body.address;
      school.link = req.body.link;
      school.image = req.body.image;
      school.save(function(err, savedSchool) {
        if (err) {
          console.log(`failed to udpate school ${savedSchool} in db`);
          res.send(404);
        }
        console.log("school update(): successful");
        res.json(savedSchool);
      });
    });
  });
}

//DELETE /api/styles/:styleId/schools/:schoolId
//       controllers.schools.destroy
function destroy(req, res) {
  console.log("Entering school destroy()");

  db.Style.findById(req.params.styleId, function(err, style) {
    if (err) {
      console.log(`failed to fecth the style(id=${req.params.styleId}) from db`);
      res.send(school); //return it anyway since it's gone from db
    }

    console.log(`found style(id=${req.params.styleId}) from db`);

    //loop search for the school in array of schools in the style
    //once found, remove it from db and the school array in the style
    //then update the style in the db
    for(let i = 0; i < style.schools.length; i++) {
      if (req.params.schoolId === style.schools[i]._id) {
        db.School.findByIdAndRemove(req.params.schoolId, function(err, removedSchool) {
          if (err) {
            console.log(`failed to remove school id ${req.params.schoolId} from db`);
            res.send(404);
          }
        });

        style.schools.splice(i, 1);  //remove the deleted school from style
        style.save();  //update style in the db
        console.log(`successfully deleted school ${school}`);
        res.json(removedSchool);
      }
    } // for

    console.log(`school NOT deleted from db. Did not find a match in style's school array`);
    res.send(404);
  });
}


module.exports = {
  getallschools: getallschools,
  index: index,
  create: create,
  update: update,
  destroy: destroy,
}
