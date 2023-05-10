const workControllers = require("../controllers/workController");
const workStepControllers = require("../controllers/workStepController");

const routes = [
  {
    method: "POST",
    path: "/api/works",
    handler: workControllers.createWork,
  },
  {
    method: "GET",
    path: "/api/works",
    handler: workControllers.getWorks,
  },
  {
    method: "GET",
    path: "/api/works/:id",
    handler: workControllers.getWorkById,
  },
  {
    method: "DELETE",
    path: "/api/works/:id",
    handler: workControllers.deleteWork,
  },
  {
    method: "POST",
    path: "/api/worksteps",
    handler: workStepControllers.createWorkStep,
  },
  {
    method: "GET",
    path: "/api/works/:workId/worksteps",
    handler: workStepControllers.getWorkStepsByWorkId,
  },
  {
    method: "GET",
    path: "/api/worksteps/:status",
    handler: workStepControllers.getWorkStepsByWorkStatus,
  },
  {
    method: "PUT",
    path: "/api/worksteps/:id",
    handler: workStepControllers.updateWorkStepStatus,
  },
  {
    method: "DELETE",
    path: "/api/worksteps/:id",
    handler: workStepControllers.deleteWorkStep,
  },
];

module.exports = routes;
