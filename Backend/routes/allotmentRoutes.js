const express = require("express");
const router = express.Router();
const allotmentController = require("../controllers/allotmentController");

router.post("/", allotmentController.addAllotment); // Add Allotment
router.get("/", allotmentController.getAllotments); // Get All Allotments
router.get("/:id", allotmentController.getAllotmentById); // Get Allotment by ID
router.put("/:id", allotmentController.updateAllotment); // Update Allotment
router.delete("/:id", allotmentController.deleteAllotment); // Delete Allotment

module.exports = router;
