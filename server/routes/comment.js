const commentControllers = require("../controllers/comment");

const routes = [
  {
    method: "POST",
    path: "/comments",
    handler: commentControllers.createComment,
  },
  {
    method: "GET",
    path: "/works/:work_id/comments",
    handler: commentControllers.getCommentsByWorkId,
  },
  {
    method: "PUT",
    path: "/comments/:id",
    handler: commentControllers.updateComment,
  },
  {
    method: "DELETE",
    path: "/comments/:id",
    handler: commentControllers.deleteComment,
  },
];

module.exports = routes;

