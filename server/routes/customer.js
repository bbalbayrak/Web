const customerControllers = require("../controllers/customer");

const routes = [
  {
    method: "POST",
    path: "/api/customers",
    handler: customerControllers.createCustomer,
  },
  {
    method: "GET",
    path: "/api/customers",
    handler: customerControllers.getAllCustomers,
  },
  {
    method: "GET",
    path: "/api/customers/search",
    handler: customerControllers.getCustomersByName,
  },  
];

module.exports = routes;
