// converter.test.js
const { convert, getSupportedCurrencies } = require("./converter");

describe("convert()", () => {
  test("converts USD to EUR correctly", () => {
    const result = convert(100, "USD", "EUR");
    expect(result).toBe(92.0);
  });

  test("returns the same amount when from and to are the same", () => {
    expect(convert(50, "USD", "USD")).toBe(50);
    expect(convert(100, "EUR", "EUR")).toBe(100);
  });
  test("converts through USD as intermediate", () => {
    // 100 EUR -> USD -> JPY
    const result = convert(100, "EUR", "JPY");
    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe("number");
  });

  test("throws on negative amount", () => {
    expect(() => convert(-10, "USD", "EUR")).toThrow(
      "Amount must be a non-negative number",
    );
  });

  test("throws on unsupported source currency", () => {
    expect(() => convert(100, "XYZ", "USD")).toThrow(
      "Unsupported currency: XYZ",
    );
  });

  test("throws on unsupported target currency", () => {
    expect(() => convert(100, "USD", "MOON")).toThrow(
      "Unsupported currency: MOON",
    );
  });
});

describe("getSupportedCurrencies()", () => {
  test("returns an array of currency codes", () => {
    const currencies = getSupportedCurrencies();
    expect(Array.isArray(currencies)).toBe(true);
    expect(currencies).toContain("USD");
    expect(currencies).toContain("EUR");
    expect(currencies.length).toBe(5);
  });
});
