const itpController = require("../controllers/itp");


const routes = [
{
    method: "POST",
    path: "/itp-forms",
    handler: itpController.createItpForm,
  },
  {
    method: "POST",
    path: "/itp-steps",
    handler: itpController.createItpStep,
  },
  {
    method: "POST",
    path: "/itp-substeps",
    handler: itpController.createItpSubstep,
  },
  {
    method: "POST",
    path: "/itpwith",
    handler: itpController.createItpWithStepsAndSubsteps,
  },
  {
    method: "GET",
    path: "/itp-forms/:id",
    handler: itpController.getItpDetails,
  },
  {
    method: "GET",
    path: "/itp-forms/all",
    handler: itpController.getAllItps,
  },
]

module.exports = routes;
