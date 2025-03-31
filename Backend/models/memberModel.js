const db = require("../config/db");

// GET Members with Filtering
exports.getFilteredMembers = async (filters) => {
  let sql = `SELECT * FROM members WHERE 1=1`;
  const values = [];

  if (filters.name) {
    sql += ` AND name LIKE ?`;
    values.push(`%${filters.name}%`);
  }

  if (filters.aadhaar) {
    sql += ` AND aadhaar LIKE ?`;
    values.push(`%${filters.aadhaar}%`);
  }

  if (filters.move_in_date) {
    sql += ` AND DATE(move_in_date) = ?`;
    values.push(filters.move_in_date);
  }

  if (filters.status) {
    sql += ` AND status = ?`;
    values.push(filters.status);
  }

  const [rows] = await db.execute(sql, values);
  return rows;
};
// ADD Member with New Fields
exports.addMember = async (member) => {
  const sql = `
    INSERT INTO members 
    (name, phone, email, occupation, aadhaar, 
    emergency_contact_phone,  vehicle_number, move_in_date, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    member.name,
    member.phone,
    member.email,
    member.occupation,
    member.aadhaar,
    member.emergency_contact_phone,
    member.vehicle_number,
    member.move_in_date,
    member.status,
  ];

  return db.execute(sql, values);
};

// GET All Members
exports.getAllMembers = async () => {
  const sql = "SELECT * FROM members";
  const [rows] = await db.execute(sql);
  return rows;
};

// GET Member by ID
exports.getMemberById = async (id) => {
  const sql = "SELECT * FROM members WHERE id = ?";
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

// UPDATE Member with New Fields
exports.updateMember = async (id, member) => {
  console.log("Updating member with ID:", id); // ✅ Log ID
  console.log("Payload received:", member);
  const sql = `
    UPDATE members 
    SET name = ?, phone = ?, email = ?, occupation = ?, aadhaar = ?, emergency_contact_phone = ?, 
         vehicle_number = ?, move_in_date = ?, status = ?
    WHERE id = ?
  `;
  const values = [
    member.name,
    member.phone,
    member.email,
    member.occupation,
    member.aadhaar,
    member.emergency_contact_phone,
    member.vehicle_number,
    member.move_in_date,
    member.status,
    id,
  ];
  try {
    const [result] = await db.execute(sql, values);
    console.log("SQL Execution Result:", result); // ✅ Log SQL result
    return result;
  } catch (error) {
    console.error("SQL Execution Error:", error); // ✅ Log any SQL errors
    throw error;
  }
  // return db.execute(sql, values);
};

// DELETE Member
exports.deleteMember = async (id) => {
  const sql = "DELETE FROM members WHERE id = ?";
  return db.execute(sql, [id]);
};
