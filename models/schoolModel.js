const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create database connection
const db = new sqlite3.Database(
  path.join(__dirname, "../db/database.sqlite"),
  (err) => {
    if (err) {
      console.error("Database connection error:", err);
      process.exit(1);
    }
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
);

function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  )`);
}

const School = {
  create(schoolData) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
        [
          schoolData.name,
          schoolData.address,
          schoolData.latitude,
          schoolData.longitude,
        ],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  getAllNearby(userLat, userLng) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM schools", [], (err, rows) => {
        if (err) reject(err);

        // Calculate distance for each school
        const schoolsWithDistance = rows.map((school) => ({
          ...school,
          distance: calculateDistance(
            userLat,
            userLng,
            school.latitude,
            school.longitude
          ),
        }));

        // Sort by distance
        resolve(schoolsWithDistance.sort((a, b) => a.distance - b.distance));
      });
    });
  },
};

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

module.exports = School;
