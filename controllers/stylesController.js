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
  console.log("Entering style creat()");

  //todo: add a validation to disallow adding a style that has been added already

  db.Style.create(req.body, function(err, createdStyle) {
    if (err) {
      console.log("style created failed");
      res.send(404);
    }

    console.log(`successfully created a style: ${createdStyle}`);
    res.json(createdStyle);
  });
}


//GET /api/styles/:styleId -- get a style based on the styleId
//    controllers.styles.show
function show(req, res) {
  console.log("Entering style show()");

  db.Style.findById(req.params.styleId, function(err, style) {
    if (err) {
      console.log(`style id: ${req.params.styleId} not found`);
    }

    console.log(`db returned with style info: ${style}`);
    res.json(style);
  });
}


//PUT /api/styles/:styleId -- edit a style
//    controllers.styles.update
function update(req, res) {
  db.Style.findById(req.params.styleId, function(err, foundStyle) {

    if (err) {
      res.send(404);
    }

    // populate the style with the new info
    console.log(foundStyle.type)
    foundStyle.type = req.body.type;
    foundStyle.description = req.body.description;
    foundStyle.comments = req.body.comments;
    foundStyle.link = req.body.link;

    foundStyle.save(function(err, savedStyle) {
      if (err) {
        console.log(`style update() failed db save with err: ${err}`);
        res.send(404);
      }

      console.log(`successfully updated style as ${savedStyle}`);
      res.json(savedStyle);
    });
  });
}




//DELETE /api/styles/:styleId -- delete a style
//       controllers.styles.destroy
function destroy(req, res) {
  console.log("Entering style destroy(): style id = ${req.params.styleId");

  db.Style.findById(req.params.styleId, function(err, style) {
    if (err) {
      console.log(`failed to find style ${req.params.styleId} from db`);
      res.send(404);
    }

    console.log(`found style ${style} from db`);

    //remove all the schools of this style from db before removing the style
    style.schools.forEach(function(schoolId) {
      db.School.findByIdAndRemove(schoolId, function(err, school) {
        if (err) {
          console.log(`failed to remove school id ${schoolId} from db`);
        }
      });
    });

    //remove the style
    db.Style.findByIdAndRemove(req.params.styleId, function(err, deletedStyle) {
      if (err) {
        console.log(`failed to remove style ${req.params.styleId} from db`);
        res.send(404);
      }

      console.log(`successfully removed style ${deletedStyle} from db`);
      res.json(deletedStyle);
    });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy,
}
