const odootowebController = require("../controllers/odootoweb");

const routes = [
  {
    method: "POST",
    path: "/api/InitiateByProcess",
    handler: odootowebController.createWork,
  }
];

module.exports = routes;
