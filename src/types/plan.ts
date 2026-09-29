export type PriorityLevel = 'high' | 'medium' | 'low';
export type ActionStatus = 'pending' | 'in_progress' | 'completed' | 'on_hold';

export type Department = 
  | 'BOD' 
  | 'Kinh doanh' 
  | 'Marketing' 
  | 'Sản phẩm & R&D' 
  | 'Vận hành' 
  | 'Nhân sự' 
  | 'Tài chính';

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'All';

export interface SmartGoal {
  id: string;
  category: 'Doanh thu' | 'Lợi nhuận' | 'Khách hàng' | 'Vận hành' | 'Nhân sự';
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  owner: string;
}

export interface SwotItem {
  id: string;
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  content: string;
  impact: 'high' | 'medium' | 'low';
}

export interface TowsStrategy {
  id: string;
  type: 'SO' | 'WO' | 'ST' | 'WT';
  title: string;
  description: string;
  relatedItems: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  type: 'lead_magnet' | 'core_offer' | 'high_ticket';
  usp: string;
  targetCustomer: string;
  targetSharePercent: number;
}

export interface ChannelItem {
  id: string;
  name: string;
  type: 'direct' | 'ecommerce' | 'retail' | 'partner' | 'agency';
  revenueShare: number; // percentage
  conversionRate: number; // percentage
  focusQuarter: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  channel: string;
  budget: number;
  expectedLeads: number;
  targetCAC: number;
}

export interface ActionItem {
  id: string;
  title: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  department: Department;
  pic: string;
  deadline: string;
  priority: PriorityLevel;
  status: ActionStatus;
  estimatedBudget: number;
  expectedResult: string;
}

export interface QuarterlyFinancials {
  revenue: number;
  cogs: number;
  opexSalaries: number;
  opexRent: number;
  opexMarketing: number;
  opexAdmin: number;
  opexContingency: number;
}

export interface FinancialPlan {
  currency: string;
  unitMultiplier: number; // 1 for VND, 1_000_000 for Triệu VND
  quarters: {
    Q1: QuarterlyFinancials;
    Q2: QuarterlyFinancials;
    Q3: QuarterlyFinancials;
    Q4: QuarterlyFinancials;
  };
  sensitivity: {
    revenueGrowthRate: number; // -30% to +50%
    cogsRateAdjustment: number; // -10% to +10%
    marketingBudgetBoost: number; // -20% to +50%
  };
}

export interface BusinessPlan {
  id: string;
  lastUpdated: string;
  companyName: string;
  industry: string;
  planningYear: number;
  author: string;
  
  // Step 1: Vision & Objectives
  vision: string;
  mission: string;
  coreValues: string[];
  strategicSummary: string;
  annualTargetRevenue: number;
  annualTargetNetProfitMargin: number; // percentage
  targetNewCustomers: number;
  targetCustomerRetention: number; // percentage
  smartGoals: SmartGoal[];

  // Step 2: SWOT & TOWS
  swotItems: SwotItem[];
  towsStrategies: TowsStrategy[];

  // Step 3: Marketing 4P
  marketing4P: {
    product: {
      strategyDescription: string;
      items: ProductItem[];
      rdInitiatives: string;
    };
    price: {
      strategyType: 'value_based' | 'cost_plus' | 'penetration' | 'premium';
      strategyDescription: string;
      targetGrossMargin: number; // %
      discountPolicy: string;
    };
    place: {
      strategyDescription: string;
      channels: ChannelItem[];
      logisticsNote: string;
    };
    promotion: {
      keyMessage: string;
      mainChannels: string[];
      annualBudget: number;
      campaigns: MarketingCampaign[];
    };
  };

  // Step 4: Action Plan
  actionItems: ActionItem[];

  // Step 5: Financials
  financials: FinancialPlan;
}

export type PresetIndustry = 'fnb' | 'saas' | 'retail' | 'agency';

export interface PresetTemplate {
  id: PresetIndustry;
  title: string;
  industryName: string;
  tagline: string;
  description: string;
  data: BusinessPlan;
}
