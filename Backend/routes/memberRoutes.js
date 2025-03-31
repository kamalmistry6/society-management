const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
// const { authMiddleware } = require("../middlewares/authMiddleware");

// Protect all member routes with middleware
// router.use(authMiddleware);

router.post("/", memberController.addMember); // POST - Add Member
router.get("/", memberController.getAllMembers); // GET - Get All Members
router.get("/:id", memberController.getMemberById); // GET - Get Member by ID
router.put("/:id", memberController.updateMember); // PUT - Update Member
router.delete("/:id", memberController.deleteMember); // Delete member

module.exports = router;
