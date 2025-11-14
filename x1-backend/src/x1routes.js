// x1Routes.js
const express = require("express");
const router = express.Router();
const db = require("./db");

// Test route
router.get("/ping", (req, res) => {
res.json({ status: "ok", route: "x1Routes" });
});

/**
* 1) GET /x1/boosts/:walletAddress
*/
router.get("/boosts/:walletAddress", async (req, res) => {
const wallet = req.params.walletAddress;

try {
const result = await db.query(
`SELECT wallet_address, total_boosts, last_updated
FROM x1_boosts
WHERE wallet_address = $1`,
[wallet]
);

if (result.rows.length === 0) {
return res.json({
wallet_address: wallet,
total_boosts: 0,
last_updated: null
});
}

return res.json(result.rows[0]);
} catch (err) {
console.error("GET boosts error:", err);
res.status(500).json({ error: "Server error" });
}
});

/**
* 2) POST /x1/session/start
*/
router.post("/session/start", async (req, res) => {
const { wallet_address } = req.body;

if (!wallet_address) {
return res.status(400).json({ error: "wallet_address is required" });
}

try {
await db.query(
`INSERT INTO x1_boosts (wallet_address, total_boosts, last_updated, source)
VALUES ($1, 0, NOW(), 'shard_frontier')
ON CONFLICT (wallet_address)
DO NOTHING`,
[wallet_address]
);

return res.json({ status: "session_started" });
} catch (err) {
console.error("Session start error:", err);
res.status(500).json({ error: "Server error" });
}
});

/**
* 3) POST /x1/session/complete
*/
router.post("/session/complete", async (req, res) => {
const { wallet_address, boosts_earned } = req.body;

if (!wallet_address) {
return res.status(400).json({ error: "wallet_address is required" });
}

const boosts = Number(boosts_earned) || 0;

try {
await db.query(
`UPDATE x1_boosts
SET total_boosts = total_boosts + $1,
last_updated = NOW()
WHERE wallet_address = $2`,
[boosts, wallet_address]
);

return res.json({
status: "session_completed",
added_boosts: boosts
});
} catch (err) {
console.error("Session complete error:", err);
res.status(500).json({ error: "Server error" });
}
});

module.exports = router;
