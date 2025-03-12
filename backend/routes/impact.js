// /backend/routes/impact.js
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

const pool = new Pool({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_NAME,
 password: process.env.DB_PASSWORD,
 port: process.env.DB_PORT,
});

// Log volunteer hours
router.post("/log", async (req, res) => {
 const { userId, hours, eventId } = req.body;
 try {
  const result = await pool.query(
   `INSERT INTO volunteer_logs (user_id, hours, event_id)
       VALUES ($1, $2, $3) RETURNING *`,
   [userId, hours, eventId]
  );
  // Update user's points (5 points per hour)
  await pool.query(`UPDATE users SET points = points + $1 WHERE id = $2`, [
   hours * 5,
   userId,
  ]);
  res.status(201).json(result.rows[0]);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Failed to log hours" });
 }
});

// Leaderboard for volunteers
router.get("/leaderboard", async (req, res) => {
 try {
  const result = await pool.query(
   "SELECT id, email, points FROM users ORDER BY points DESC"
  );
  res.json(result.rows);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Failed to fetch leaderboard" });
 }
});

module.exports = router;
