/**
 * Format a number as Japanese Yen (no decimals).
 */
export function formatYen(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

/**
 * Calculate gross profit and profit rate.
 */
export function calcProfit(buyPrice: number, sellPrice: number) {
  const grossProfit = sellPrice - buyPrice;
  const profitRate =
    sellPrice > 0 ? Math.round((grossProfit / sellPrice) * 100 * 100) / 100 : 0;
  return { grossProfit, profitRate };
}

/**
 * Calculate recommended price with margin (default 20%).
 */
export function calcRecommendedPrice(
  marketPrice: number,
  margin = 0.2,
): number {
  return Math.round(marketPrice * (1 + margin));
}
