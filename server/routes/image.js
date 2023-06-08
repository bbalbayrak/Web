const imageControllers = require("../controllers/image");

const routes = [
  {
    method: "POST",
    path: "/api/images",
    handler: imageControllers.createImage,
  },
  {
    method: "GET",
    path: "/api/quality_control/:quality_control_id/images",
    handler: imageControllers.getImagesByQualityControlId,
  },
  {
    method: "PUT",
    path: "/api/images/:id",
    handler: imageControllers.updateImageStatus,
  },
];

module.exports = routes;
