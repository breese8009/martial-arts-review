//Display all the available endpoints
function index(req, res) {
  res.json({
    message: "Welcome to Martial Arts Review!",
    message: "Welcome to my personal favorite birds api! Here's what you need to know!",
    documentationUrl: "https://github.com/breese8009/martial-arts-review/README.md",
    baseUrl: "https://github.com/breese8009/martial-arts-review/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/styles", description: "Show all Martial Arts Styles"},
      {method: "GET", path: "/api/styles/:styleId", description: "Show a specified Martial Arts Style"},
      {method: "POST", path: "/api/styles", description: "Add a new Martial Arts Style"},
      {method: "PUT", path: "/api/styles/:styleId", description: "Modify a previously added Martial Arts Style"},
      {method: "DELETE", path: "/api/styles/:styleId", description: "Delete a specified Martial Arts Style"},
      {method: "GET", path: "/api/styles/:styleId/schools", description: "Show all schools of a specified Martial Arts Style"},
      {method: "POST", path: "/api/styles/:styleId/schools", description: "Add a school to a specified Martial Arts Style"},
      {method: "PUT", path: "/api/styles/:styleId/schools/:schoolId", description: "Modify a school of a specified Martial Arts Style"},
      {method: "DELETE", path: "/api/styles/:styleId/schools/:schoolId", description: "Delete a specified school from a specified Martial Arts Style"},
    ]
  });
}

module.exports = {
  index: index
}
