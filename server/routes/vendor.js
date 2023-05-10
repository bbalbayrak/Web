const vendorControllers = require("../controllers/vendor");

const routes = [
  {
    method: "POST",
    path: "/api/vendors",
    handler: vendorControllers.createVendor,
  },
  {
    method: "GET",
    path: "/api/vendors",
    handler: vendorControllers.getAllVendors,
  },
  {
    method: "GET",
    path: "/api/vendors/search",
    handler: vendorControllers.getVendorsByName,
  },
  
];

module.exports = routes;