const inspectionPlanController = require("../controllers/inspectionplan");

const routes = [
  {
    method: "POST",
    path: "/api/inspectionplans",
    handler: inspectionPlanController.createInspectionPlan,
  }
];

module.exports = routes;
