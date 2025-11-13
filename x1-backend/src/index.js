import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js"; // <-- connect to Railway Postgres

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple root route
app.get("/", (req, res) => {
res.send("Shard Frontier backend is running");
});

// Health check route
app.get("/health", (req, res) => {
res.json({ ok: true, message: "X1 backend alive" });
});

// Test database route
app.get("/test-db", async (req, res) => {
try {
const result = await db.query("SELECT NOW()");
res.json({ success: true, time: result.rows[0].now });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Railway PORT only
const PORT = process.env.PORT;

app.listen(PORT, () => {
console.log(`Backend running on port ${PORT}`);
});
