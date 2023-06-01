const locationControllers = require("../controllers/locationController");

const routes = [
  {
    method: "POST",
    path: "/api/locations",
    handler: locationControllers.createLocation,
  },
  {
    method: "GET",
    path: "/api/locations/latest",
    handler: locationControllers.getLatestLocations,
  },
];

module.exports = routes;
