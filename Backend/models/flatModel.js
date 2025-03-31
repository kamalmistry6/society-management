const db = require("../config/db");

// ADD Flat
// GET All Flats with Status
exports.getFlats = async () => {
  const sql = "SELECT id, flat_no, block_no, flat_type, status FROM flat";
  const [rows] = await db.execute(sql);
  return rows;
};

// GET All Flats
exports.getFlats = async () => {
  const sql = "SELECT * FROM flat";
  const [rows] = await db.execute(sql);
  return rows;
};

// GET Flat by ID
exports.getFlatById = async (id) => {
  const sql = "SELECT * FROM flat WHERE id = ?";
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

// UPDATE Flat
exports.updateFlat = async (id, flat_no, block_no, flat_type) => {
  const sql =
    "UPDATE flat SET flat_no = ?, block_no = ?, flat_type = ? WHERE id = ?";
  return db.execute(sql, [flat_no, block_no, flat_type, id]);
};

// DELETE Flat
exports.deleteFlat = async (id) => {
  const sql = "DELETE FROM flat WHERE id = ?";
  return db.execute(sql, [id]);
};
