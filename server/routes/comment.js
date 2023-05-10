const commentControllers = require("../controllers/comment");

const routes = [
  {
    method: "POST",
    path: "/api/comments",
    handler: commentControllers.createComment,
  },
  {
    method: "GET",
    path: "/api/works/:work_id/comments",
    handler: commentControllers.getCommentsByWorkId,
  },
  {
    method: "PUT",
    path: "/api/comments/:id",
    handler: commentControllers.updateComment,
  },
  {
    method: "DELETE",
    path: "/api/comments/:id",
    handler: commentControllers.deleteComment,
  },
];

module.exports = routes;

