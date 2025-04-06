const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
// const { authMiddleware } = require("../middlewares/authMiddleware");

// router.use(authMiddleware);

router.get("/", memberController.getAllUsers);
router.delete("/:id", memberController.deleteUser);
// router.post("/", memberController.addMember); // POST - Add Member
// router.get("/:id", memberController.getMemberById); // GET - Get Member by ID
router.put("/:id", memberController.updateUser); // PUT - Update Member

module.exports = router;
