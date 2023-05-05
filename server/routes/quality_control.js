const QualityControl = require("../controllers/quality_control");

const routes = [
  {
    method: "POST",
    path: "/api/quality_control",
    handler: QualityControl.createQualityControl,
  },
  {
    method: "GET",
    path: "/api/quality_control/form/:form_id",
    handler: QualityControl.findByFormId,
  },
  {
    method: "PUT",
    path: "/api/quality_control",
    handler: QualityControl.updateQualityControl,
  }
]
  module.exports = routes;