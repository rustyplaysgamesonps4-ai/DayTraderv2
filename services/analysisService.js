function RSI(prices) {
  let gains = 0, losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  const rs = gains / (losses || 1);
  return 100 - (100 / (1 + rs));
}

function movingAvg(prices) {
  return prices.reduce((a, b) => a + b, 0) / prices.length;
}

function momentum(prices) {
  return prices[0] - prices[prices.length - 1];
}

function analyze(prices) {
  const rsi = RSI(prices);
  const ma = movingAvg(prices);
  const last = prices[0];
  const mom = momentum(prices);

  let score = 0;
  let reasons = [];

  if (rsi < 30) {
    score += 2;
    reasons.push("Oversold (RSI)");
  }

  if (rsi > 70) {
    score -= 2;
    reasons.push("Overbought (RSI)");
  }

  if (last > ma) {
    score += 1;
    reasons.push("Above moving average");
  } else {
    score -= 1;
    reasons.push("Below moving average");
  }

  if (mom > 0) {
    score += 1;
    reasons.push("Upward momentum");
  } else {
    score -= 1;
    reasons.push("Downward momentum");
  }

  let action = "HOLD";
  let confidence = 5;

  if (score >= 3) {
    action = "BUY";
    confidence = 9;
  } else if (score <= -3) {
    action = "SELL";
    confidence = 9;
  }

  return {
    action,
    confidence,
    rsi: rsi.toFixed(1),
    reasons,
    entry: last.toFixed(2),
    target: (last * 1.02).toFixed(2),
    stop: (last * 0.98).toFixed(2)
  };
}

module.exports = { analyze };
