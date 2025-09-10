/*
 * Currency formatting utility.
 *
 * Uses the browser's Intl.NumberFormat API to format numbers into
 * currency strings. Defaults to USD but will respect the provided
 * currency code when available.
 */

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  } catch {
    // Fallback formatting when Intl is not available or currency code invalid
    return `${currency} ${amount.toFixed(2)}`;
  }
}