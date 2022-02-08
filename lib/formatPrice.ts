export default function formatPrice(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };

  // check if its a clean dollar amount
  if (amount % 1 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-GB', options);

  return formatter.format(amount);
}