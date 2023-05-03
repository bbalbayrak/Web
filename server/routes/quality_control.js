const QualityControl = require("../controllers/quality_control");

const routes = [
  {
    method: "POST",
    path: "/api/quality_control",
    handler: QualityControl.createQualityControl,
  }
]
  module.exports = routes;