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
];

module.exports = routes;
