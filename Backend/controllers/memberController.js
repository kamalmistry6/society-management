const memberModel = require("../models/memberModel");

// // GET Members with Filtering
// exports.getFilteredMembers = async (req, res) => {
//   const { name, aadhaar, move_in_date, status } = req.query;

//   const filters = {
//     name: name || null,
//     aadhaar: aadhaar || null,
//     move_in_date: move_in_date || null,
//     status: status || null,
//   };

//   try {
//     const members = await memberModel.getFilteredMembers(filters);
//     res.status(200).json(members);
//   } catch (error) {
//     console.error("Error fetching filtered members:", error);
//     res.status(500).json({ message: "Error fetching members" });
//   }
// };

// UPDATE Member with New Fields
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    await memberModel.updateUser(id, user);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating User" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await memberModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await memberModel.deleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member" });
  }
};
