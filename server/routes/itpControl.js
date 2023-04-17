const itpControlController = require("../controllers/itpControl");

const routes = [
  {
    method: "POST",
    path: "/itp-controls",
    handler: itpControlController.createItpControl,
  },
  {
    method: "GET",
    path: "/itp-controls/:id",
    handler: itpControlController.getItpControlById,
  },
];

module.exports = routes;
