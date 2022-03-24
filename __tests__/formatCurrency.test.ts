import formatCurrency from "../lib/formatCurrency";

describe('formatCurrency function', () => { 
  it('works with whole prices and drops trailing zeros', () => {
    expect(formatCurrency(5)).toBe('£5');

  });

  it('adds commas to prices greater than £999.99', () => { 
    expect(formatCurrency(1000)).toBe('£1,000');
    expect(formatCurrency(1000000)).toBe('£1,000,000');
  });

  it('works with whole and fractional prices', () => {
    expect(formatCurrency(1.23)).toBe('£1.23');
    expect(formatCurrency(12.3)).toBe('£12.30');
    expect(formatCurrency(123.4)).toBe('£123.40');
    expect(formatCurrency(1234.5)).toBe('£1,234.50');
    expect(formatCurrency(12345.6)).toBe('£12,345.60');
    expect(formatCurrency(123456.7)).toBe('£123,456.70');
    expect(formatCurrency(1234567.8)).toBe('£1,234,567.80');
    expect(formatCurrency(12345678.9)).toBe('£12,345,678.90');
  });
})