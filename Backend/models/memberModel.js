const db = require("../config/db");

// // GET Members with Filtering
// exports.getFilteredMembers = async (filters) => {
//   let sql = `SELECT * FROM users WHERE 1=1`;
//   const values = [];

//   if (filters.name) {
//     sql += ` AND name LIKE ?`;
//     values.push(`%${filters.name}%`);
//   }

//   if (filters.aadhaar) {
//     sql += ` AND aadhaar LIKE ?`;
//     values.push(`%${filters.aadhaar}%`);
//   }

//   if (filters.move_in_date) {
//     sql += ` AND DATE(move_in_date) = ?`;
//     values.push(filters.move_in_date);
//   }

//   if (filters.status) {
//     sql += ` AND status = ?`;
//     values.push(filters.status);
//   }

//   const [rows] = await db.execute(sql, values);
//   return rows;
// };

// UPDATE Member with New Fields
exports.updateUser = async (id, user) => {
  console.log("Updating user with ID:", id);
  console.log("Payload received:", user);
  const sql = `
    UPDATE user 
    SET name = ?, phone = ?,email = ?, address = ?, city = ?, state = ?, pincode = ?, 
        occupation = ?, aadhaar = ?, emergency_contact_phone = ?, vehicle_number = ?, 
        move_in_date = ?, status = ?
    WHERE id = ?
  `;
  const values = [
    user.name,
    user.phone,
    user.email,
    user.address,
    user.city,
    user.state,
    user.pincode,
    user.occupation,
    user.aadhaar,
    user.emergency_contact_phone,
    user.vehicle_number,
    user.move_in_date,
    user.status,
    id,
  ];
  return db.execute(sql, values);
};

exports.getAllUsers = async () => {
  const sql = "SELECT * FROM user";
  const [rows] = await db.execute(sql);
  return rows;
};

exports.deleteUser = async (id) => {
  const sql = "DELETE FROM user WHERE id = ?";
  return db.execute(sql, [id]);
};
