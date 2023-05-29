const formControllers = require("../controllers/form");

const routes = [
  {
    method: "POST",
    path: "/api/forms",
    handler: formControllers.createOrUpdateForm,
  },
  {
    method: "GET",
    path: "/api/forms",
    handler: formControllers.getFormTable,
  },
  {
    method: "GET",
    path: "/api/forms/:id",
    handler: formControllers.getForm,
  },
  {
    method: "PUT",
    path: "/api/forms/substeps",
    handler: formControllers.updateMultipleSubsteps,
  },
  {
    method: "DELETE",
    path: "/api/forms/substeps",
    handler: formControllers.deleteFormSubstep,
  },
  {
    method: "GET",
    path: "/api/allforms/:id",
    handler: formControllers.getAllForm,
  },
  {
    method: "GET",
    path: "/api/forms/vendor/:vendor_id/product/:product_id",
    handler: formControllers.getFormByVendorIdAndProductId
  }
];

module.exports = routes;
