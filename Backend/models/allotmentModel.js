const db = require("../config/db");

// ADD Allotment with optional end_date (NULL for permanent ownership)
// ADD Allotment and Update Flat Status
exports.addAllotment = async (
  user_id,
  flat_id,
  start_date,
  end_date = null
) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert allotment
    const sql = `
      INSERT INTO allotment (user_id, flat_id, start_date, end_date)
      VALUES (?, ?, ?, ?)
    `;
    await connection.execute(sql, [user_id, flat_id, start_date, end_date]);

    // Update flat status to "Alloted"
    const updateFlatSql = `
      UPDATE flat
      SET status = 'Alloted'
      WHERE id = ?
    `;
    await connection.execute(updateFlatSql, [flat_id]);

    const updateMemberSql = `
      UPDATE user
      SET status = 'Active'
      WHERE id = ?
    `;
    await connection.execute(updateMemberSql, [user_id]);

    await connection.commit();
    connection.release();
    return { message: "Allotment added and flat status updated successfully" };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
};

// GET All Allotments with Flat Details (handle NULL end_date)
exports.getAllotments = async () => {
  const sql = `
    SELECT 
      a.id AS allotment_id,
      m.id AS user_id, 
      m.name AS user_name,
      f.id AS flat_id,
      f.flat_no,
      f.block_no,
      f.flat_type,
      a.start_date,
      IFNULL(a.end_date, 'Permanent') AS end_date
    FROM allotment a
    JOIN user m ON a.user_id = m.id
    JOIN flat f ON a.flat_id = f.id
  `;
  const [rows] = await db.execute(sql);
  return rows;
};

// GET Allotment by ID (handle NULL end_date)
exports.getAllotmentById = async (id) => {
  const sql = `
    SELECT 
      a.id AS allotment_id,
      m.id AS user_id, 
      m.name AS user_name,
      f.id AS flat_id,
      f.flat_no,
      f.block_no,
      f.flat_type,
      a.start_date,
      IFNULL(a.end_date, 'Permanent') AS end_date
    FROM allotment a
    JOIN user m ON a.user_id = m.id
    JOIN flat f ON a.flat_id = f.id
    WHERE a.id = ?
  `;
  const [rows] = await db.execute(sql, [id]);
  return rows[0] || null;
};

// UPDATE Allotment with optional end_date
exports.updateAllotment = async (
  id,
  user_id,
  flat_id,
  start_date,
  end_date = null
) => {
  const sql = `
    UPDATE allotment 
    SET user_id = ?, flat_id = ?, start_date = ?, end_date = ?
    WHERE id = ?
  `;

  const params = end_date
    ? [user_id, flat_id, start_date, end_date, id]
    : [user_id, flat_id, start_date, null, id];

  const [result] = await db.execute(sql, params);
  return result;
};

exports.deleteAllotment = async (id) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Get the flat_id and user_id associated with the allotment
    const [allotment] = await connection.execute(
      `SELECT flat_id, user_id FROM allotment WHERE id = ?`,
      [id]
    );

    if (allotment.length === 0) {
      await connection.rollback();
      connection.release();
      return { message: "Allotment not found", affectedRows: 0 };
    }

    const { flat_id, user_id } = allotment[0];

    // Delete the allotment
    const [result] = await connection.execute(
      `DELETE FROM allotment WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      connection.release();
      return { message: "Failed to delete allotment", affectedRows: 0 };
    }

    // Reset the flat status to "Available"
    await connection.execute(
      `UPDATE flat SET status = 'Available' WHERE id = ?`,
      [flat_id]
    );

    // Check if the user still has any active allotments
    const [userAllotments] = await connection.execute(
      `SELECT id FROM allotment WHERE user_id = ?`,
      [user_id]
    );

    // If no more active allotments, set user status to "Inactive"
    if (userAllotments.length === 0) {
      await connection.execute(
        `UPDATE user SET status = 'Inactive' WHERE id = ?`,
        [user_id]
      );
    }

    await connection.commit();
    connection.release();

    return {
      message: "Allotment deleted successfully",
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
};
