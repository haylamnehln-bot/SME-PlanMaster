import { FinancialPlan, QuarterlyFinancials } from '../types/plan';

export interface CalculatedQuarter {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number; // percentage (0 - 100)
  opexSalaries: number;
  opexRent: number;
  opexMarketing: number;
  opexAdmin: number;
  opexContingency: number;
  totalOpex: number;
  netProfit: number;
  netMargin: number; // percentage (-100 to 100)
}

export interface CalculatedFinancialSummary {
  quarters: CalculatedQuarter[];
  totalRevenue: number;
  totalCogs: number;
  totalGrossProfit: number;
  overallGrossMargin: number;
  totalSalaries: number;
  totalRent: number;
  totalMarketing: number;
  totalAdmin: number;
  totalContingency: number;
  totalOpex: number;
  totalNetProfit: number;
  overallNetMargin: number;
  breakEvenRevenue: number;
  opexPercentageOfRevenue: number;
}

export function calculateQuarterFinancials(
  raw: QuarterlyFinancials,
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
  sensitivity: { revenueGrowthRate: number; cogsRateAdjustment: number; marketingBudgetBoost: number }
): CalculatedQuarter {
  // Apply revenue sensitivity
  const revFactor = 1 + (sensitivity.revenueGrowthRate || 0) / 100;
  const adjRevenue = Math.max(0, Math.round(raw.revenue * revFactor));

  // Apply COGS sensitivity adjustment
  const baseCogsRatio = raw.revenue > 0 ? raw.cogs / raw.revenue : 0.4;
  const adjCogsRatio = Math.max(0.05, Math.min(0.95, baseCogsRatio + (sensitivity.cogsRateAdjustment || 0) / 100));
  const adjCogs = Math.round(adjRevenue * adjCogsRatio);

  const grossProfit = adjRevenue - adjCogs;
  const grossMargin = adjRevenue > 0 ? (grossProfit / adjRevenue) * 100 : 0;

  // Apply marketing sensitivity
  const mktFactor = 1 + (sensitivity.marketingBudgetBoost || 0) / 100;
  const adjMarketing = Math.max(0, Math.round(raw.opexMarketing * mktFactor));

  const totalOpex = 
    raw.opexSalaries + 
    raw.opexRent + 
    adjMarketing + 
    raw.opexAdmin + 
    raw.opexContingency;

  const netProfit = grossProfit - totalOpex;
  const netMargin = adjRevenue > 0 ? (netProfit / adjRevenue) * 100 : 0;

  return {
    quarter,
    revenue: adjRevenue,
    cogs: adjCogs,
    grossProfit,
    grossMargin,
    opexSalaries: raw.opexSalaries,
    opexRent: raw.opexRent,
    opexMarketing: adjMarketing,
    opexAdmin: raw.opexAdmin,
    opexContingency: raw.opexContingency,
    totalOpex,
    netProfit,
    netMargin,
  };
}

export function calculateFinancialSummary(plan: FinancialPlan): CalculatedFinancialSummary {
  const sensitivity = plan.sensitivity || { revenueGrowthRate: 0, cogsRateAdjustment: 0, marketingBudgetBoost: 0 };
  
  const q1 = calculateQuarterFinancials(plan.quarters.Q1, 'Q1', sensitivity);
  const q2 = calculateQuarterFinancials(plan.quarters.Q2, 'Q2', sensitivity);
  const q3 = calculateQuarterFinancials(plan.quarters.Q3, 'Q3', sensitivity);
  const q4 = calculateQuarterFinancials(plan.quarters.Q4, 'Q4', sensitivity);

  const quarters = [q1, q2, q3, q4];

  const totalRevenue = quarters.reduce((acc, q) => acc + q.revenue, 0);
  const totalCogs = quarters.reduce((acc, q) => acc + q.cogs, 0);
  const totalGrossProfit = totalRevenue - totalCogs;
  const overallGrossMargin = totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;

  const totalSalaries = quarters.reduce((acc, q) => acc + q.opexSalaries, 0);
  const totalRent = quarters.reduce((acc, q) => acc + q.opexRent, 0);
  const totalMarketing = quarters.reduce((acc, q) => acc + q.opexMarketing, 0);
  const totalAdmin = quarters.reduce((acc, q) => acc + q.opexAdmin, 0);
  const totalContingency = quarters.reduce((acc, q) => acc + q.opexContingency, 0);

  const totalOpex = totalSalaries + totalRent + totalMarketing + totalAdmin + totalContingency;
  const totalNetProfit = totalGrossProfit - totalOpex;
  const overallNetMargin = totalRevenue > 0 ? (totalNetProfit / totalRevenue) * 100 : 0;

  // Break-even Revenue = Fixed OPEX / Gross Margin Ratio
  const grossMarginRatio = overallGrossMargin / 100;
  const breakEvenRevenue = grossMarginRatio > 0 ? Math.round(totalOpex / grossMarginRatio) : 0;
  const opexPercentageOfRevenue = totalRevenue > 0 ? (totalOpex / totalRevenue) * 100 : 0;

  return {
    quarters,
    totalRevenue,
    totalCogs,
    totalGrossProfit,
    overallGrossMargin,
    totalSalaries,
    totalRent,
    totalMarketing,
    totalAdmin,
    totalContingency,
    totalOpex,
    totalNetProfit,
    overallNetMargin,
    breakEvenRevenue,
    opexPercentageOfRevenue,
  };
}

/**
 * Format currency nicely for Vietnamese business context
 * e.g., 12.500.000.000 -> 12,5 tỷ VNĐ or 12.500.000.000 VNĐ
 */
export function formatVND(amount: number, compact: boolean = false): string {
  if (isNaN(amount)) return '0 VNĐ';
  
  if (compact) {
    const abs = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';
    if (abs >= 1_000_000_000) {
      const val = (abs / 1_000_000_000).toFixed(1).replace('.', ',');
      return `${sign}${val} tỷ VNĐ`;
    }
    if (abs >= 1_000_000) {
      const val = (abs / 1_000_000).toFixed(0);
      return `${sign}${val} tr VNĐ`;
    }
  }

  return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + ' VNĐ';
}

export function formatPercent(value: number): string {
  if (isNaN(value)) return '0%';
  return `${value >= 0 ? '' : ''}${value.toFixed(1)}%`;
}
