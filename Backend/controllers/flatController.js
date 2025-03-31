const flatModel = require("../models/flatModel");

// ADD Flat
exports.addFlat = async (req, res) => {
  const { flat_no, block_no, flat_type } = req.body;

  if (!flat_no || !block_no || !flat_type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await flatModel.addFlat(flat_no, block_no, flat_type);
    res.status(201).json({ message: "Flat added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding flat" });
  }
};

// GET All Flats
exports.getFlats = async (req, res) => {
  try {
    const flats = await flatModel.getFlats();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flats" });
  }
};

// GET Flat by ID
exports.getFlatById = async (req, res) => {
  const { id } = req.params;
  try {
    const flat = await flatModel.getFlatById(id);
    if (!flat) return res.status(404).json({ message: "Flat not found" });

    res.json(flat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flat" });
  }
};

// UPDATE Flat
exports.updateFlat = async (req, res) => {
  const { id } = req.params;
  const { flat_no, block_no, flat_type } = req.body;

  try {
    await flatModel.updateFlat(id, flat_no, block_no, flat_type);
    res.json({ message: "Flat updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating flat" });
  }
};

// DELETE Flat
exports.deleteFlat = async (req, res) => {
  const { id } = req.params;

  try {
    await flatModel.deleteFlat(id);
    res.json({ message: "Flat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flat" });
  }
};
