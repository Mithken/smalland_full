export const CURRENCY_RATIOS = {
  COPPER_TO_SILVER: 10,
  SILVER_TO_GOLD: 10,
  GOLD_TO_PLATINUM: 10
} as const;

export interface CurrencyBreakdown {
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
}

export function convertToCopper(
  platinum: number = 0,
  gold: number = 0,
  silver: number = 0,
  copper: number = 0
): number {
  return (
    (platinum * CURRENCY_RATIOS.GOLD_TO_PLATINUM * CURRENCY_RATIOS.SILVER_TO_GOLD * CURRENCY_RATIOS.COPPER_TO_SILVER) +
    (gold * CURRENCY_RATIOS.SILVER_TO_GOLD * CURRENCY_RATIOS.COPPER_TO_SILVER) +
    (silver * CURRENCY_RATIOS.COPPER_TO_SILVER) +
    copper
  );
}

export function breakdownCurrency(copperAmount: number): CurrencyBreakdown {
  const totalCopper = Math.floor(copperAmount);
  
  const platinum = Math.floor(totalCopper / (CURRENCY_RATIOS.COPPER_TO_SILVER * CURRENCY_RATIOS.SILVER_TO_GOLD * CURRENCY_RATIOS.GOLD_TO_PLATINUM));
  let remainder = totalCopper % (CURRENCY_RATIOS.COPPER_TO_SILVER * CURRENCY_RATIOS.SILVER_TO_GOLD * CURRENCY_RATIOS.GOLD_TO_PLATINUM);
  
  const gold = Math.floor(remainder / (CURRENCY_RATIOS.COPPER_TO_SILVER * CURRENCY_RATIOS.SILVER_TO_GOLD));
  remainder = remainder % (CURRENCY_RATIOS.COPPER_TO_SILVER * CURRENCY_RATIOS.SILVER_TO_GOLD);
  
  const silver = Math.floor(remainder / CURRENCY_RATIOS.COPPER_TO_SILVER);
  const copper = remainder % CURRENCY_RATIOS.COPPER_TO_SILVER;
  
  return { platinum, gold, silver, copper };
}

export function formatCurrency(copperAmount: number, showZeroes: boolean = false): string {
  const { platinum, gold, silver, copper } = breakdownCurrency(copperAmount);
  
  const parts: string[] = [];
  
  if (platinum > 0 || showZeroes) parts.push(`${platinum}p`);
  if (gold > 0 || showZeroes) parts.push(`${gold}g`);
  if (silver > 0 || showZeroes) parts.push(`${silver}s`);
  if (copper > 0 || showZeroes) parts.push(`${copper}c`);
  
  return parts.join(' ');
}

export function formatGoldDecimal(copperAmount: number): string {
  const { platinum, gold, silver, copper } = breakdownCurrency(copperAmount);
  const totalGold = platinum * CURRENCY_RATIOS.GOLD_TO_PLATINUM + gold;
  const decimal = (silver * CURRENCY_RATIOS.COPPER_TO_SILVER + copper) / (CURRENCY_RATIOS.COPPER_TO_SILVER * CURRENCY_RATIOS.SILVER_TO_GOLD);
  
  return `${totalGold + decimal.toFixed(2)}`;
}