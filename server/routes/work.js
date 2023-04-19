const workControllers = require("../controllers/workController");
const workStepControllers = require("../controllers/workStepController");

const routes = [
  {
    method: "POST",
    path: "/works",
    handler: workControllers.createWork,
  },
  {
    method: "GET",
    path: "/works",
    handler: workControllers.getWorks,
  },
  {
    method: "GET",
    path: "/works/:id",
    handler: workControllers.getWorkById,
  },
  {
    method: "PUT",
    path: "/works/:id",
    handler: workControllers.updateWork,
  },
  {
    method: "DELETE",
    path: "/works/:id",
    handler: workControllers.deleteWork,
  },
  {
    method: "POST",
    path: "/worksteps",
    handler: workStepControllers.createWorkStep,
  },
  {
    method: "GET",
    path: "/works/:workId/worksteps",
    handler: workStepControllers.getWorkStepsByWorkId,
  },
  {
    method: "GET",
    path: "/worksteps/:status",
    handler: workStepControllers.getWorkStepsByWorkStatus,
  },
  {
    method: "PUT",
    path: "/worksteps/:id",
    handler: workStepControllers.updateWorkStepState,
  },
  {
    method: "DELETE",
    path: "/worksteps/:id",
    handler: workStepControllers.deleteWorkStep,
  },
];

module.exports = routes;
