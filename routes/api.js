const express = require("express");
const router = express.Router();

const { getStock } = require("../services/stockService");
const { analyze } = require("../services/analysisService");

router.get("/analyze/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  const prices = await getStock(symbol);
  if (!prices) return res.json({ error: "No data" });

  const result = analyze(prices);

  res.json({
    symbol,
    prices,
    ...result
  });
});

module.exports = router;
