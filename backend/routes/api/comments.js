/**
 * Comments API router.
 *
 * Base path: `/api/comments`
 *
 * This module exposes read and delete operations for comment resources.
 * Responses follow Express JSON conventions and surface HTTP 500 when an
 * unexpected database error occurs.
 *
 * @module routes/api/comments
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * Fetches all comments.
 *
 * @name GET/api/comments
 * @function
 * @memberof module:routes/api/comments
 * @returns {Promise<void>} Sends an array of comment documents as JSON on success.
 * @throws Sends HTTP 500 with `{ error: string }` payload when retrieval fails.
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/**
 * Deletes a comment by its identifier.
 *
 * @name DELETE/api/comments/:commentId
 * @function
 * @memberof module:routes/api/comments
 * @param {import("express").Request} req Express request object containing `commentId` in `req.params`.
 * @param {import("express").Response} res Express response object used to send JSON payloads.
 * @returns {Promise<void>} Sends a confirmation message when the deletion succeeds.
 * @throws Sends HTTP 500 with `{ error: string }` payload when the deletion fails.
 */
router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: "Invalid commentId" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
      return res.status(404).json({ error: "Comment not found" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});