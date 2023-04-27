const formControllers = require("../controllers/form");

const routes = [
  {
    method: "POST",
    path: "/forms",
    handler: formControllers.createOrUpdateForm,
  },
  {
    method: "GET",
    path: "/forms",
    handler: formControllers.getFormTable,
  },
  {
    method: "GET",
    path: "/forms/:id",
    handler: formControllers.getForm,
  },
  {
    method: "PUT",
    path: "/forms/substeps",
    handler: formControllers.updateMultipleSubsteps,
  },
  {
    method: "DELETE",
    path: "/forms/substeps",
    handler: formControllers.deleteFormSubstep,
  },
  {
    method: "GET",
    path: "/allforms/:id",
    handler: formControllers.getAllForm,
  },
  {
    method: "GET",
    path: "/forms/vendor/:vendor_id/product/:product_id",
    handler: formControllers.getFormByVendorIdAndProductId
  }
];

module.exports = routes;
