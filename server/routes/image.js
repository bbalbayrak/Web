const imageControllers = require("../controllers/image");

const routes = [
  {
    method: "POST",
    path: "/images",
    handler: imageControllers.createImage,
  },
  {
    method: "GET",
    path: "/quality_control/:quality_control_id/images",
    handler: imageControllers.getImagesByQualityControlId,
  },
];

module.exports = routes;
