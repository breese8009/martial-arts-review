// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var stylesList =[];
stylesList.push({
              type: 'Muay Thai',
              link: '#',
              description: 'This is a stand up type fights style, using knees, elbows, and kicks',
              comments: 'Rough/painful style'
            });
stylesList.push({
              type: 'Brazilian Jiu Jitsu',
              link: '#',
              description: 'This is a style that involved a mix of wrestling and submissions.',
              comments: 'I like this style because you can go as hard as you want and not get hurt or banged up'
            });
stylesList.push({
              type: 'Karate',
              link: '#',
              description: 'This is a traditional style of martial arts that involves mostly basic self defense',
              comments: 'This style is not realistic in anyway what so ever and should be used only for kids at a young age for fun.'
            });
stylesList.push({
              type: 'Aikido',
              link: '#',
              description: 'Aikido is also a traditional style that involves alot of small joint manipulation and pressure points on the body',
              comments: 'I like this style because it allows for more realistic approach to fighting and shows what will take an opponent out immediately '
            });

console.log(stylesList);

db.School.remove({}, function(err, school) {
 if (err) {
   console.log("failed to wipe out schools from seeding.js");
 }
 else {
   console.log("successfully wiped out all schools from seeding.js");
 }
});

db.Style.remove({}, function(err, styles) {
  db.Style.create(stylesList, function(err, styles) {
    if (err) {
      console.log("Seeding styleList failed: err = ${err}");
      res.send(404);
    }
    console.log("Seeding styleList successful");
    process.exit();
  });
});
