const customerControllers = require("../controllers/customer");

const routes = [
  {
    method: "POST",
    path: "/customers",
    handler: customerControllers.createCustomer,
  },
  {
    method: "GET",
    path: "/customers",
    handler: customerControllers.getAllCustomers,
  },
  {
    method: "GET",
    path: "/customers/search",
    handler: customerControllers.getCustomersByName,
  },  
];

module.exports = routes;
