const allotmentModel = require("../models/allotmentModel");

// ADD Allotment with optional end_date
exports.addAllotment = async (req, res) => {
  const { member_id, flat_id, start_date, end_date } = req.body;

  if (!member_id || !flat_id || !start_date) {
    return res
      .status(400)
      .json({ message: "Member ID, Flat ID, and Start Date are required" });
  }

  try {
    await allotmentModel.addAllotment(
      member_id,
      flat_id,
      start_date,
      end_date || null
    );
    res.status(201).json({ message: "Allotment added successfully" });
  } catch (error) {
    console.error("Error adding allotment:", error);
    res
      .status(500)
      .json({ message: "Error adding allotment", error: error.message });
  }
};

// GET All Allotments
exports.getAllotments = async (req, res) => {
  try {
    const allotments = await allotmentModel.getAllotments();
    res.status(200).json(allotments);
  } catch (error) {
    console.error("Error fetching allotments:", error);
    res
      .status(500)
      .json({ message: "Error fetching allotments", error: error.message });
  }
};

// GET Allotment by ID
exports.getAllotmentById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const allotment = await allotmentModel.getAllotmentById(id);
    if (!allotment) {
      return res.status(404).json({ message: "Allotment not found" });
    }
    res.status(200).json(allotment);
  } catch (error) {
    console.error("Error fetching allotment:", error);
    res
      .status(500)
      .json({ message: "Error fetching allotment", error: error.message });
  }
};

// UPDATE Allotment with optional end_date
exports.updateAllotment = async (req, res) => {
  const { id } = req.params;
  const { member_id, flat_id, start_date, end_date } = req.body;

  if (!id || !member_id || !flat_id || !start_date) {
    return res.status(400).json({ message: "Invalid or missing data" });
  }

  try {
    const result = await allotmentModel.updateAllotment(
      id,
      member_id,
      flat_id,
      start_date,
      end_date || null
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Allotment not found" });
    }

    res.status(200).json({ message: "Allotment updated successfully" });
  } catch (error) {
    console.error("Error updating allotment:", error);
    res
      .status(500)
      .json({ message: "Error updating allotment", error: error.message });
  }
};

exports.deleteAllotment = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const result = await allotmentModel.deleteAllotment(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Allotment not found" });
    }

    res.status(200).json({
      message: "Allotment deleted and flat status reset successfully",
    });
  } catch (error) {
    console.error("Error deleting allotment:", error);
    res
      .status(500)
      .json({ message: "Error deleting allotment", error: error.message });
  }
};
