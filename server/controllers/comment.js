const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  try {
    const { text, created_by, created_on, work_id } = req.body;
    const newComment = await Comment.create(text, created_by, created_on, work_id);
    res.status(201).send({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    res.status(500).send({ message: "Error creating comment", error: error.message });
  }
};

exports.getCommentsByWorkId = async (req, res) => {
  try {
    const work_id = req.params.work_id;
    const comments = await Comment.findByWorkId(work_id);
    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving comments", error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;
    const updatedComment = await Comment.update(id, text);
    if (!updatedComment) {
      res.status(404).send({ message: "Comment not found" });
      return;
    }
    res.status(200).send({ message: "Comment updated successfully", data: updatedComment });
  } catch (error) {
    res.status(500).send({ message: "Error updating comment", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    await Comment.delete(id);
    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting comment", error: error.message });
  }
};
