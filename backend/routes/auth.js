const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_NAME,
 password: process.env.DB_PASSWORD,
 port: process.env.DB_PORT,
});

// Register new user
router.post("/register", async (req, res) => {
 const { email, password, skills, causes } = req.body;
 try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
   "INSERT INTO users (email, password, skills, causes) VALUES ($1, $2, $3, $4) RETURNING id, email, skills, causes",
   [email, hashedPassword, skills, causes]
  );
  res.status(201).json(result.rows[0]);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Registration failed" });
 }
});

// Login user
router.post("/login", async (req, res) => {
 const { email, password } = req.body;
 console.log("Login attempt:", email); // Debugging statement
 try {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
   email,
  ]);
  const user = result.rows[0];
  if (!user) {
   console.log("User not found"); // Debugging statement
   return res.status(400).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
   console.log("Invalid credentials"); // Debugging statement
   return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
   expiresIn: "1h",
  });
  res.json({
   token,
   user: {
    id: user.id,
    email: user.email,
    skills: user.skills,
    causes: user.causes,
   },
  });
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Login failed" });
 }
});

module.exports = router;
