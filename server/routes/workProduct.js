const workProductControllers = require("../controllers/workProductController");

const routes = [
  {
    method: "POST",
    path: "/api/workproducts",
    handler: workProductControllers.createWorkProduct,
  },
  {
    method: "GET",
    path: "/api/works/:work_id/workproducts",
    handler: workProductControllers.getWorkProductsByWorkId,
  },
];

module.exports = routes;
