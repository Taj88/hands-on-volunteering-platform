// /backend/routes/teams.js
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

// Create a team
router.post("/", async (req, res) => {
 const { name, isPrivate, creatorId } = req.body;
 try {
  const result = await pool.query(
   `INSERT INTO teams (name, is_private, creator_id)
       VALUES ($1, $2, $3) RETURNING *`,
   [name, isPrivate, creatorId]
  );
  res.status(201).json(result.rows[0]);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Team creation failed" });
 }
});

// Join a team
router.post("/:teamId/join", async (req, res) => {
 const { teamId } = req.params;
 const { userId } = req.body;
 try {
  const result = await pool.query(
   `INSERT INTO team_members (team_id, user_id)
       VALUES ($1, $2) RETURNING *`,
   [teamId, userId]
  );
  res.json(result.rows[0]);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Could not join team" });
 }
});

// List all teams
router.get("/", async (req, res) => {
 try {
  const result = await pool.query(
   "SELECT * FROM teams ORDER BY created_at DESC"
  );
  res.json(result.rows);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Could not fetch teams" });
 }
});

module.exports = router;
