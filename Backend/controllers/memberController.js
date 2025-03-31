const memberModel = require("../models/memberModel");

// GET Members with Filtering
exports.getFilteredMembers = async (req, res) => {
  const { name, aadhaar, move_in_date, status } = req.query;

  const filters = {
    name: name || null,
    aadhaar: aadhaar || null,
    move_in_date: move_in_date || null,
    status: status || null,
  };

  try {
    const members = await memberModel.getFilteredMembers(filters);
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching filtered members:", error);
    res.status(500).json({ message: "Error fetching members" });
  }
};
// ADD Member with New Fields
exports.addMember = async (req, res) => {
  const member = req.body;

  if (!member.name || !member.phone || !member.email) {
    return res
      .status(400)
      .json({ message: "Name, phone, and email are required" });
  }

  try {
    await memberModel.addMember(member);
    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding member" });
  }
};

// GET All Members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await memberModel.getAllMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members" });
  }
};

// GET Member by ID
exports.getMemberById = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await memberModel.getMemberById(id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member" });
  }
};

// UPDATE Member with New Fields
exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const member = req.body;

  try {
    await memberModel.updateMember(id, member);
    res.json({ message: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating member" });
  }
};

// DELETE Member
exports.deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    await memberModel.deleteMember(id);
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member" });
  }
};
