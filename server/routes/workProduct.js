const workProductControllers = require("../controllers/workProductController");

const routes = [
  {
    method: "POST",
    path: "/workproducts",
    handler: workProductControllers.createWorkProduct,
  },
  {
    method: "GET",
    path: "/works/:work_id/workproducts",
    handler: workProductControllers.getWorkProductsByWorkId,
  },
];

module.exports = routes;
