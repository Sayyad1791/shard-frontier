import x1Routes from "./x1Routes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js"; // <-- connect to Railway Postgres

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// X1 API KEY middleware
function requireX1Key(req, res, next) {
const key = req.header("x-api-key");
if (!key || key !== process.env.X1_API_KEY) {
return res.status(401).json({ ok: false, error: "Unauthorized" });
}
next();
}
app.use("/x1", x1Routes);

// Simple root route
app.get("/", (req, res) => {
res.send("Shard Frontier backend is running");
});

// Health check route
app.get("/health", (req, res) => {
res.json({ ok: true, message: "X1 backend alive" });
});
// X1: Start Session
app.post("/x1/session/start", requireX1Key, async (req, res) => {
try {
const { walletAddress, sessionId, source = "Shard Frontier" } = req.body;

if (!walletAddress || !sessionId) {
return res
.status(400)
.json({ ok: false, error: "walletAddress and sessionId are required" });
}

await db.query(
`
INSERT INTO x1_boosts (wallet_address, source)
VALUES ($1, $2)
ON CONFLICT (wallet_address) DO NOTHING;
`,
[walletAddress, source]
);

res.json({
ok: true,
message: "Session started",
walletAddress,
sessionId,
});
} catch (err) {
console.error("Error in /x1/session/start:", err);
res.status(500).json({ ok: false, error: "Server error" });
}
});
// X1: Complete Session
app.post("/x1/session/complete", requireX1Key, async (req, res) => {
try {
const { walletAddress, boostsEarned, source = "Shard Frontier" } = req.body;

if (!walletAddress) {
return res
.status(400)
.json({ ok: false, error: "walletAddress is required" });
}

// Fake mode: if no boostsEarned sent, default to +10
const boost = Number.isInteger(boostsEarned) ? boostsEarned : 10;

const result = await db.query(
`
INSERT INTO x1_boosts (wallet_address, total_boosts, source)
VALUES ($1, $2, $3)
ON CONFLICT (wallet_address)
DO UPDATE SET
total_boosts = x1_boosts.total_boosts + EXCLUDED.total_boosts,
source = EXCLUDED.source,
last_updated = NOW()
RETURNING wallet_address, total_boosts, source, last_updated;
`,
[walletAddress, boost, source]
);

const row = result.rows[0];

res.json({
ok: true,
message: "Session completed, boosts updated",
walletAddress: row.wallet_address,
totalBoosts: row.total_boosts,
source: row.source,
lastUpdated: row.last_updated,
});
} catch (err) {
console.error("Error in /x1/session/complete:", err);
res.status(500).json({ ok: false, error: "Server error" });
}
});
// X1: Get boosts for a wallet
app.get("/x1/boosts/:walletAddress", requireX1Key, async (req, res) => {
try {
const { walletAddress } = req.params;

const result = await db.query(
`
SELECT wallet_address, total_boosts, source, last_updated
FROM x1_boosts
WHERE wallet_address = $1;
`,
[walletAddress]
);

if (result.rowCount === 0) {
// No boosts yet
return res.json({
ok: true,
walletAddress,
totalBoosts: 0,
source: null,
lastUpdated: null,
});
}

const row = result.rows[0];

res.json({
ok: true,
walletAddress: row.wallet_address,
totalBoosts: row.total_boosts,
source: row.source,
lastUpdated: row.last_updated,
});
} catch (err) {
console.error("Error in /x1/boosts:", err);
res.status(500).json({ ok: false, error: "Server error" });
}
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
