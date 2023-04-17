const itpController = require("../controllers/itp");


const routes = [
  {
    method: "POST",
    path: "/itpwith",
    handler: itpController.createItpWithSteps,
  },
]

module.exports = routes;
