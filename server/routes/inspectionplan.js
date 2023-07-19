const inspectionPlanController = require("../controllers/inspectionplan");

const routes = [
  {
    method: "POST",
    path: "/api/inspectionplans",
    handler: inspectionPlanController.createInspectionPlan,
  },
  {
    method: "GET",
    path: "/api/inspectionplans",
    handler: inspectionPlanController.getAllInspectionPlans,
  },
  {
    method: "GET",
    path: "/api/inspectionplans/opendraft",
    handler: inspectionPlanController.getOpenDraftInspectionPlans,
  },
  {
    method: "GET",
    path: "/api/inspectionplans/openwaiting",
    handler: inspectionPlanController.getOpenWaitingInspectionPlans,
  },
  {
    method: "GET",
    path: "/api/inspectionplans/closed",
    handler: inspectionPlanController.getClosedInspectionPlans,
  },
  {
    method: "DELETE",
    path: "/api/inspectionplans/:id",
    handler: inspectionPlanController.deleteInspectionPlan,
  },
  {
    method: "PUT",
    path: "/api/inspectionplans/:id",
    handler: inspectionPlanController.updateInspectionPlan,
  }  
];

module.exports = routes;
