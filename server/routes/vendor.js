const vendorControllers = require("../controllers/vendor");

const routes = [
  {
    method: "POST",
    path: "/vendors",
    handler: vendorControllers.createVendor,
  },
  {
    method: "GET",
    path: "/vendors",
    handler: vendorControllers.getAllVendors,
  },
  {
    method: "GET",
    path: "/vendors/search",
    handler: vendorControllers.getVendorsByName,
  },
  
];

module.exports = routes;