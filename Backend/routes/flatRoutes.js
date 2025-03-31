const express = require("express");
const router = express.Router();
const flatController = require("../controllers/flatController");

router.post("/", flatController.addFlat); // Add Flat
router.get("/", flatController.getFlats); // Get All Flats
router.get("/:id", flatController.getFlatById); // Get Flat by ID
router.put("/:id", flatController.updateFlat); // Update Flat
router.delete("/:id", flatController.deleteFlat); // Delete Flat

module.exports = router;
