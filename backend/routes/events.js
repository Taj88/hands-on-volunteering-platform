// /backend/routes/events.js
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

const pool = new Pool({
 user: "your_user",
 host: "localhost",
 database: "hands_on_db",
 password: "your_password",
 port: 5432,
});

// Create a new event
router.post("/", async (req, res) => {
 const { title, description, date, time, location, category } = req.body;
 try {
  const result = await pool.query(
   `INSERT INTO events (title, description, date, time, location, category)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
   [title, description, date, time, location, category]
  );
  res.status(201).json(result.rows[0]);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Event creation failed" });
 }
});

// List all events
router.get("/", async (req, res) => {
 try {
  const result = await pool.query("SELECT * FROM events ORDER BY date ASC");
  res.json(result.rows);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Could not fetch events" });
 }
});

// Join an event
router.post("/:eventId/join", async (req, res) => {
 const { eventId } = req.params;
 const { userId } = req.body;
 try {
  const result = await pool.query(
   "INSERT INTO event_participants (event_id, user_id) VALUES ($1, $2) RETURNING *",
   [eventId, userId]
  );
  res.json(result.rows[0]);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Could not join event" });
 }
});

module.exports = router;
