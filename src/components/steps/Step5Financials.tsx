import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sliders, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  RotateCcw, 
  Check, 
  AlertCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { BusinessPlan, QuarterlyFinancials } from '../../types/plan';
import { 
  calculateFinancialSummary, 
  formatVND, 
  formatPercent,
  CalculatedFinancialSummary 
} from '../../utils/financialCalculations';

interface Step5FinancialsProps {
  plan: BusinessPlan;
  onChange: (updated: Partial<BusinessPlan>) => void;
  onPrev: () => void;
  onViewDashboard: () => void;
  onViewReport: () => void;
}

export const Step5Financials: React.FC<Step5FinancialsProps> = ({
  plan,
  onChange,
  onPrev,
  onViewDashboard,
  onViewReport,
}) => {
  const [activeTab, setActiveTab] = useState<'pnl' | 'sensitivity'>('pnl');

  const financials = plan.financials;
  const summary: CalculatedFinancialSummary = calculateFinancialSummary(financials);

  const handleUpdateQuarter = (
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
    field: keyof QuarterlyFinancials,
    val: number
  ) => {
    onChange({
      financials: {
        ...financials,
        quarters: {
          ...financials.quarters,
          [quarter]: {
            ...financials.quarters[quarter],
            [field]: val,
          },
        },
      },
    });
  };

  const handleUpdateSensitivity = (
    field: 'revenueGrowthRate' | 'cogsRateAdjustment' | 'marketingBudgetBoost',
    val: number
  ) => {
    onChange({
      financials: {
        ...financials,
        sensitivity: {
          ...financials.sensitivity,
          [field]: val,
        },
      },
    });
  };

  const resetSensitivity = () => {
    onChange({
      financials: {
        ...financials,
        sensitivity: {
          revenueGrowthRate: 0,
          cogsRateAdjustment: 0,
          marketingBudgetBoost: 0,
        },
      },
    });
  };

  // SVG Chart 1 dimensions & scale
  const maxRevenue = Math.max(...summary.quarters.map((q) => q.revenue), 1);
  const chartHeight = 180;

  // OPEX Donut segments
  const opexCategories = [
    { label: 'Lương & Nhân sự', value: summary.totalSalaries, color: '#4f46e5' },
    { label: 'Thuê mặt bằng', value: summary.totalRent, color: '#0ea5e9' },
    { label: 'Tiếp thị & Bán hàng', value: summary.totalMarketing, color: '#8b5cf6' },
    { label: 'Quản lý & Hành chính', value: summary.totalAdmin, color: '#f59e0b' },
    { label: 'Dự phòng rủi ro', value: summary.totalContingency, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Bước 5: Dự Toán Tài Chính & Mô Phỏng Thời Gian Thực</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Báo Cáo P&L Dự Phóng & Biểu Đồ Thời Gian Thực
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Tất cả các số liệu Doanh thu, Giá vốn (COGS), Chi phí vận hành (OPEX), Điểm hòa vốn và Lợi nhuận ròng được tính toán tự động và biểu diễn trực quan trên biểu đồ thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              &larr; Bước 4 (Action Plan)
            </button>
            <button
              onClick={onViewDashboard}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Xem Bảng Điều Hành &rarr;
            </button>
            <button
              onClick={onViewReport}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Xuất Báo Cáo In A4 &rarr;
            </button>
          </div>
        </div>

        {/* 4 Financial Highlight KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Tổng Doanh Thu Năm
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatVND(summary.totalRevenue)}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Mục tiêu: {formatVND(plan.annualTargetRevenue, true)}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Lợi Nhuận Gộp (Gross Profit)
            </span>
            <div className="text-lg font-bold text-emerald-600 font-mono tabular-nums">
              {formatVND(summary.totalGrossProfit)}
            </div>
            <span className="text-[11px] font-medium text-emerald-700 mt-1 block font-mono">
              Biên gộp: {formatPercent(summary.overallGrossMargin)}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Tổng Chi Phí Vận Hành (OPEX)
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatVND(summary.totalOpex)}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block font-mono">
              Chiếm {formatPercent(summary.opexPercentageOfRevenue)} doanh thu
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Lợi Nhuận Ròng (Net Profit)
            </span>
            <div className={`text-lg font-bold font-mono tabular-nums ${
              summary.totalNetProfit >= 0 ? 'text-indigo-600' : 'text-rose-600'
            }`}>
              {formatVND(summary.totalNetProfit)}
            </div>
            <span className="text-[11px] font-medium text-indigo-700 mt-1 block font-mono">
              Biên ròng: {formatPercent(summary.overallNetMargin)}
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Interactive SVG Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Quarterly Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Biểu Đồ Doanh Thu & Lợi Nhuận Theo Quý (Thời Gian Thực)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Cột xanh: Doanh thu | Cột xám: Chi phí tổng | Đường tím: Lợi nhuận ròng
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-indigo-600" />
                <span className="text-slate-600 font-medium">Doanh thu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-300" />
                <span className="text-slate-600 font-medium">Tổng CP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-slate-600 font-medium">LN ròng</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="pt-2">
            <div className="grid grid-cols-4 gap-4 h-56 items-end pb-6 border-b border-slate-200">
              {summary.quarters.map((q) => {
                const totalCost = q.cogs + q.totalOpex;
                const revHeightPercent = maxRevenue > 0 ? (q.revenue / maxRevenue) * 100 : 0;
                const costHeightPercent = maxRevenue > 0 ? (totalCost / maxRevenue) * 100 : 0;
                const profitHeightPercent = maxRevenue > 0 ? Math.max(0, (q.netProfit / maxRevenue) * 100) : 0;

                return (
                  <div key={q.quarter} className="flex flex-col items-center h-full justify-end group">
                    {/* Hover Values */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center mb-1 text-slate-600">
                      LN: {formatVND(q.netProfit, true)}
                    </div>

                    <div className="w-full flex items-end justify-center gap-1.5 h-44">
                      {/* Revenue Bar */}
                      <div
                        className="w-1/3 bg-indigo-600 rounded-t-sm transition-all duration-300 hover:bg-indigo-700"
                        style={{ height: `${Math.max(4, revHeightPercent)}%` }}
                        title={`Doanh thu ${q.quarter}: ${formatVND(q.revenue)}`}
                      />

                      {/* Cost Bar */}
                      <div
                        className="w-1/3 bg-slate-300 rounded-t-sm transition-all duration-300 hover:bg-slate-400"
                        style={{ height: `${Math.max(4, costHeightPercent)}%` }}
                        title={`Tổng chi phí ${q.quarter}: ${formatVND(totalCost)}`}
                      />

                      {/* Net Profit Bar */}
                      <div
                        className="w-1/3 bg-emerald-500 rounded-t-sm transition-all duration-300 hover:bg-emerald-600"
                        style={{ height: `${Math.max(4, profitHeightPercent)}%` }}
                        title={`Lợi nhuận ròng ${q.quarter}: ${formatVND(q.netProfit)}`}
                      />
                    </div>

                    {/* Quarter Label */}
                    <div className="mt-2 text-center">
                      <span className="text-xs font-bold text-slate-800 font-mono">{q.quarter}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {formatVND(q.revenue, true)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 2: OPEX Breakdown Donut / Progress */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              <span>Cơ Cấu Chi Phí Vận Hành (OPEX)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Tổng OPEX: {formatVND(summary.totalOpex)}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {opexCategories.map((cat, idx) => {
              const share = summary.totalOpex > 0 ? (cat.value / summary.totalOpex) * 100 : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{cat.label}</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {formatVND(cat.value, true)} ({share.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${share}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Break-even box */}
          <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Doanh Thu Điểm Hòa Vốn:</span>
              <span className="font-mono">{formatVND(summary.breakEvenRevenue)}</span>
            </div>
            <p className="text-[11px] text-amber-700 leading-tight">
              Mức doanh thu tối thiểu cần đạt trong năm để bù đắp toàn bộ biến phí và định phí hoạt động.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Sensitivity & Simulation Sliders */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Mô Phỏng Độ Nhạy & Kịch Bản Tài Chính (Sensitivity Simulation)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kéo thanh trượt để giả lập tác động khi Doanh thu tăng/giảm, Giá vốn thay đổi hoặc Tăng ngân sách Marketing.
            </p>
          </div>

          <button
            onClick={resetSensitivity}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại 0%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Revenue Sensitivity */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Biến động Doanh thu:</span>
              <span className={`font-mono font-bold ${
                financials.sensitivity.revenueGrowthRate > 0
                  ? 'text-emerald-600'
                  : financials.sensitivity.revenueGrowthRate < 0
                  ? 'text-rose-600'
                  : 'text-slate-600'
              }`}>
                {financials.sensitivity.revenueGrowthRate > 0 ? '+' : ''}
                {financials.sensitivity.revenueGrowthRate}%
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              step="5"
              value={financials.sensitivity.revenueGrowthRate}
              onChange={(e) => handleUpdateSensitivity('revenueGrowthRate', Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-30% (Kịch bản xấu)</span>
              <span>0% (Cơ sở)</span>
              <span>+50% (Bùng nổ)</span>
            </div>
          </div>

          {/* Slider 2: COGS Sensitivity */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Biến động Giá Vốn (COGS):</span>
              <span className={`font-mono font-bold ${
                financials.sensitivity.cogsRateAdjustment > 0
                  ? 'text-rose-600'
                  : financials.sensitivity.cogsRateAdjustment < 0
                  ? 'text-emerald-600'
                  : 'text-slate-600'
              }`}>
                {financials.sensitivity.cogsRateAdjustment > 0 ? '+' : ''}
                {financials.sensitivity.cogsRateAdjustment}% điểm
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={financials.sensitivity.cogsRateAdjustment}
              onChange={(e) => handleUpdateSensitivity('cogsRateAdjustment', Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-10% (Tiết kiệm giá vốn)</span>
              <span>0%</span>
              <span>+10% (Lạm phát giá nhập)</span>
            </div>
          </div>

          {/* Slider 3: Marketing Budget Sensitivity */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Tăng/Giảm Ngân Sách MKT:</span>
              <span className={`font-mono font-bold ${
                financials.sensitivity.marketingBudgetBoost > 0
                  ? 'text-purple-600'
                  : financials.sensitivity.marketingBudgetBoost < 0
                  ? 'text-amber-600'
                  : 'text-slate-600'
              }`}>
                {financials.sensitivity.marketingBudgetBoost > 0 ? '+' : ''}
                {financials.sensitivity.marketingBudgetBoost}%
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              step="5"
              value={financials.sensitivity.marketingBudgetBoost}
              onChange={(e) => handleUpdateSensitivity('marketingBudgetBoost', Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-30% (Thắt chặt)</span>
              <span>0%</span>
              <span>+50% (Đẩy mạnh ads)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed P&L Spreadsheet Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Bảng Kế Hoạch Kết Quả Kinh Doanh P&L (Đơn vị: VNĐ)
            </h3>
            <p className="text-xs text-slate-500">
              Bạn có thể click trực tiếp vào từng ô để chỉnh sửa số liệu từng quý; toàn bộ biểu đồ sẽ tự động nhảy số.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Năm tài chính: {plan.planningYear}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 min-w-[200px]">Chỉ tiêu Tài chính</th>
                <th className="py-3 px-4 text-right">Quý 1 (Q1)</th>
                <th className="py-3 px-4 text-right">Quý 2 (Q2)</th>
                <th className="py-3 px-4 text-right">Quý 3 (Q3)</th>
                <th className="py-3 px-4 text-right">Quý 4 (Q4)</th>
                <th className="py-3 px-4 text-right bg-indigo-50/50 text-indigo-950 font-extrabold">Cả Năm {plan.planningYear}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {/* Doanh thu thuần */}
              <tr className="bg-white hover:bg-slate-50 font-bold text-slate-900">
                <td className="py-3 px-4 font-sans font-bold">1. Doanh thu thuần (Revenue)</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-3 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].revenue}
                      onChange={(e) => handleUpdateQuarter(q, 'revenue', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                ))}
                <td className="py-3 px-4 text-right bg-indigo-50/50 font-extrabold text-indigo-700 text-sm">
                  {formatVND(summary.totalRevenue)}
                </td>
              </tr>

              {/* Giá vốn hàng bán */}
              <tr className="bg-white hover:bg-slate-50 text-slate-700">
                <td className="py-2.5 px-4 font-sans">2. Giá vốn hàng bán (COGS)</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-2.5 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].cogs}
                      onChange={(e) => handleUpdateQuarter(q, 'cogs', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                ))}
                <td className="py-2.5 px-4 text-right bg-indigo-50/50 font-semibold text-slate-800">
                  {formatVND(summary.totalCogs)}
                </td>
              </tr>

              {/* Lợi nhuận gộp */}
              <tr className="bg-emerald-50/40 font-bold text-emerald-800 border-y border-emerald-100">
                <td className="py-3 px-4 font-sans font-bold">3. Lợi nhuận gộp (Gross Profit)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="py-3 px-4 text-right font-bold">
                    {formatVND(q.grossProfit, true)} ({q.grossMargin.toFixed(1)}%)
                  </td>
                ))}
                <td className="py-3 px-4 text-right bg-emerald-100/60 font-extrabold text-emerald-900 text-sm">
                  {formatVND(summary.totalGrossProfit)} ({formatPercent(summary.overallGrossMargin)})
                </td>
              </tr>

              {/* OPEX 1: Lương */}
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="py-2 px-4 pl-8 font-sans">4.1. Lương & Nhân sự</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-2 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].opexSalaries}
                      onChange={(e) => handleUpdateQuarter(q, 'opexSalaries', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-[11px]"
                    />
                  </td>
                ))}
                <td className="py-2 px-4 text-right bg-indigo-50/50">{formatVND(summary.totalSalaries)}</td>
              </tr>

              {/* OPEX 2: Thuê mặt bằng */}
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="py-2 px-4 pl-8 font-sans">4.2. Thuê mặt bằng & Cơ sở</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-2 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].opexRent}
                      onChange={(e) => handleUpdateQuarter(q, 'opexRent', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-[11px]"
                    />
                  </td>
                ))}
                <td className="py-2 px-4 text-right bg-indigo-50/50">{formatVND(summary.totalRent)}</td>
              </tr>

              {/* OPEX 3: Tiếp thị & Quảng cáo */}
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="py-2 px-4 pl-8 font-sans">4.3. Tiếp thị, Quảng cáo & Bán hàng</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-2 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].opexMarketing}
                      onChange={(e) => handleUpdateQuarter(q, 'opexMarketing', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-[11px]"
                    />
                  </td>
                ))}
                <td className="py-2 px-4 text-right bg-indigo-50/50">{formatVND(summary.totalMarketing)}</td>
              </tr>

              {/* OPEX 4: Quản lý & Vận hành */}
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="py-2 px-4 pl-8 font-sans">4.4. Quản lý chung & Hành chính</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-2 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].opexAdmin}
                      onChange={(e) => handleUpdateQuarter(q, 'opexAdmin', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-[11px]"
                    />
                  </td>
                ))}
                <td className="py-2 px-4 text-right bg-indigo-50/50">{formatVND(summary.totalAdmin)}</td>
              </tr>

              {/* OPEX 5: Dự phòng */}
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="py-2 px-4 pl-8 font-sans">4.5. Dự phòng rủi ro & Chi phí khác</td>
                {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => (
                  <td key={q} className="py-2 px-4 text-right">
                    <input
                      type="number"
                      value={financials.quarters[q].opexContingency}
                      onChange={(e) => handleUpdateQuarter(q, 'opexContingency', Number(e.target.value) || 0)}
                      className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-[11px]"
                    />
                  </td>
                ))}
                <td className="py-2 px-4 text-right bg-indigo-50/50">{formatVND(summary.totalContingency)}</td>
              </tr>

              {/* Tổng OPEX */}
              <tr className="bg-slate-100/50 font-bold text-slate-900 border-t border-slate-200">
                <td className="py-3 px-4 font-sans">4. Tổng chi phí vận hành (Total OPEX)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="py-3 px-4 text-right font-bold">
                    {formatVND(q.totalOpex, true)}
                  </td>
                ))}
                <td className="py-3 px-4 text-right bg-indigo-50/50 font-bold text-slate-900">
                  {formatVND(summary.totalOpex)}
                </td>
              </tr>

              {/* Lợi nhuận ròng */}
              <tr className="bg-indigo-50/70 font-extrabold text-indigo-900 text-sm border-t-2 border-indigo-200">
                <td className="py-3.5 px-4 font-sans">5. Lợi nhuận ròng sau chi phí (Net Profit)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className={`py-3.5 px-4 text-right font-bold ${
                    q.netProfit >= 0 ? 'text-indigo-900' : 'text-rose-600'
                  }`}>
                    {formatVND(q.netProfit, true)} ({q.netMargin.toFixed(1)}%)
                  </td>
                ))}
                <td className={`py-3.5 px-4 text-right font-extrabold text-base ${
                  summary.totalNetProfit >= 0 ? 'text-indigo-800' : 'text-rose-600'
                }`}>
                  {formatVND(summary.totalNetProfit)} ({formatPercent(summary.overallNetMargin)})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
