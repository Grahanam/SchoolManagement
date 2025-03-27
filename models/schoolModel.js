const pool = require("../config/db");

const School = {
  async create(schoolData) {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [
        schoolData.name,
        schoolData.address,
        schoolData.latitude,
        schoolData.longitude,
      ]
    );
    return result.insertId;
  },

  async getAllNearby(userLat, userLng) {
    const [rows] = await pool.query(
      `SELECT 
        id,
        name,
        address,
        latitude,
        longitude,
        (6371 * ACOS(
          COS(RADIANS(?)) *
          COS(RADIANS(latitude)) *
          COS(RADIANS(longitude) - RADIANS(?)) +
          SIN(RADIANS(?)) *
          SIN(RADIANS(latitude))
        )) AS distance
      FROM schools
      ORDER BY distance ASC`,
      [userLat, userLng, userLat]
    );
    return rows;
  },
};

module.exports = School;
