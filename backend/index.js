require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});

pool
 .connect()
 .then(() => console.log("Connected to PostgreSQL"))
 .catch((err) => console.error("Connection error", err));

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");
const helpRoutes = require("./routes/help");
const teamsRoutes = require("./routes/teams");
const impactRoutes = require("./routes/impact");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Set CSP headers
app.use((req, res, next) => {
 res.setHeader(
  "Content-Security-Policy",
  "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; style-src 'self' 'unsafe-inline';"
 );
 next();
});

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/impact", impactRoutes);
app.use("/api/users", usersRoutes);

console.log(
 "Registered routes: /api/auth, /api/events, /api/help, /api/teams, /api/impact, /api/users"
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 console.log("Available routes:");
 console.log("/api/auth");
 console.log("/api/events");
 console.log("/api/help");
 console.log("/api/teams");
 console.log("/api/impact");
 console.log("/api/users");
});
