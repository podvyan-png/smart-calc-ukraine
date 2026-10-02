export function formatCurrency(
  value: number,
  options: { decimals?: number; currencySymbol?: string } = {}
): string {
  const { decimals = 2, currencySymbol = 'грн' } = options;

  if (isNaN(value)) return `0 ${currencySymbol}`;

  const formatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${formatted} ${currencySymbol}`;
}

export function formatNumber(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '0';
  return new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
