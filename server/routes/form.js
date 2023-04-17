const formControllers = require("../controllers/form");

const routes = [
  {
    method: "POST",
    path: "/forms",
    handler: formControllers.createForm,
  },
  {
    method: "GET",
    path: "/forms",
    handler: formControllers.getFormStepsAndSubsteps,
  },
  {
    method: "PUT",
    path: "/forms/steps",
    handler: formControllers.updateFormStep,
  },
  {
    method: "PUT",
    path: "/forms/substeps",
    handler: formControllers.updateFormSubstep,
  },
  {
    method: "POST",
    path: "/forms/substeps",
    handler: formControllers.addFormSubstep,
  },
  {
    method: "DELETE",
    path: "/forms/substeps",
    handler: formControllers.deleteFormSubstep,
  },
  {
    method: "GET",
    path: "/forms/by_product_vendor",
    handler: formControllers.getFormByProductIdAndVendorId,
  },
];

module.exports = routes;
