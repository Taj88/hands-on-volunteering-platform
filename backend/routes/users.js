const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});

// Get all users
router.get("/", async (req, res) => {
 console.log("GET /api/users hit");
 try {
  const result = await pool.query("SELECT * FROM users");
  console.log("Query successful, returning users");
  res.json(result.rows);
 } catch (err) {
  console.error("Error fetching users:", err);
  res.status(500).json({ error: "Failed to fetch users" });
 }
});

module.exports = router;
