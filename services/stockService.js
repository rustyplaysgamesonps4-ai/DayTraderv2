const axios = require("axios");

async function getStock(symbol) {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHA_KEY}`;

    const res = await axios.get(url);
    const data = res.data["Time Series (5min)"];

    if (!data) return null;

    return Object.values(data)
      .slice(0, 30)
      .map(x => parseFloat(x["4. close"]));
  } catch (err) {
    return null;
  }
}

module.exports = { getStock };
