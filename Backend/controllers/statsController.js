const db = require("../config/db");

exports.getStats = async (req, res) => {
  try {
    const connection = await db.getConnection();

    // Fetch Flats Stats
    const [flats] = await connection.execute(`
      SELECT 
          COUNT(*) AS total_flats,
          SUM(CASE WHEN status = 'Alloted' THEN 1 ELSE 0 END) AS allotted_flats,
          SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS available_flats
      FROM flat;
    `);

    // Fetch Members Stats
    const [members] = await connection.execute(`
      SELECT 
          COUNT(*) AS total_members,
          SUM(CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END) AS active_members,
          (COUNT(*) - SUM(CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END)) AS inactive_members
      FROM members 
      LEFT JOIN allotment a ON members.id = a.member_id;
    `);

    // Fetch Allotments Stats
    const [allotments] = await connection.execute(`
      SELECT 
          COUNT(*) AS total_allotments,
          SUM(CASE WHEN end_date IS NULL THEN 1 ELSE 0 END) AS permanent_allotments,
          SUM(CASE WHEN end_date IS NOT NULL THEN 1 ELSE 0 END) AS temporary_allotments
      FROM allotment;
    `);

    connection.release();

    // Send combined stats
    res.status(200).json({
      flats: flats[0],
      members: members[0],
      allotments: allotments[0],
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats", error });
  }
};
