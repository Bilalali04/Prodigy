const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask, inviteUserToTask } = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middlewares.js");

router.get("/", verifyAccessToken, getTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.post('/:taskId/invite', verifyAccessToken, inviteUserToTask);
router.put("/:taskId", verifyAccessToken, putTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;
