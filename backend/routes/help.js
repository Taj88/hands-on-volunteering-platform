// /backend/routes/help.js
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

// Create a help request
router.post("/", async (req, res) => {
 const { userId, message, urgency } = req.body;
 try {
  const result = await pool.query(
   `INSERT INTO help_requests (user_id, message, urgency)
       VALUES ($1, $2, $3) RETURNING *`,
   [userId, message, urgency]
  );
  res.status(201).json(result.rows[0]);
 } catch (err) {
  console.error("Error posting help request:", err);
  res.status(500).json({ error: "Failed to post help request" });
 }
});

// List all help requests
router.get("/", async (req, res) => {
 try {
  const result = await pool.query(
   "SELECT * FROM help_requests ORDER BY created_at DESC"
  );
  res.json(result.rows);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Could not fetch help requests" });
 }
});

module.exports = router;
