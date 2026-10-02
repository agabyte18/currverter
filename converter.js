// converter.js
const RATES = {
  USD: 1,
  EUR: 1.92,
  GBP: 0.79,
  JPY: 149.5,
  PHP: 56.8,
};

function convert(amount, from, to) {
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Amount must be a non-negative number");
  }
  if (!RATES[from]) {
    throw new Error(`Unsupported currency: ${from}`);
  }
  if (!RATES[to]) {
    throw new Error(`Unsupported currency: ${to}`);
  }
  // Convert to USD first, then to target currency
  const inUSD = amount / RATES[from];
  return parseFloat((inUSD * RATES[to]).toFixed(2));
}

function getSupportedCurrencies() {
  return Object.keys(RATES);
}

module.exports = { convert, getSupportedCurrencies };
