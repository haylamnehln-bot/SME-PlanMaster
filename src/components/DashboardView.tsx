import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  CalendarRange, 
  TrendingUp, 
  Edit3, 
  ArrowRight,
  Printer,
  Package,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { BusinessPlan } from '../types/plan';
import { calculateFinancialSummary, formatVND, formatPercent } from '../utils/financialCalculations';

interface DashboardViewProps {
  plan: BusinessPlan;
  onNavigateStep: (stepId: number) => void;
  onViewReport: () => void;
  onOpenAiAdvisor: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  plan,
  onNavigateStep,
  onViewReport,
  onOpenAiAdvisor,
}) => {
  const summary = calculateFinancialSummary(plan.financials);

  const completedActions = plan.actionItems.filter((a) => a.status === 'completed').length;
  const inProgressActions = plan.actionItems.filter((a) => a.status === 'in_progress').length;
  const actionCompletionRate = plan.actionItems.length > 0 
    ? Math.round((completedActions / plan.actionItems.length) * 100) 
    : 0;

  const strengths = plan.swotItems.filter((s) => s.type === 'strength');
  const weaknesses = plan.swotItems.filter((s) => s.type === 'weakness');
  const opportunities = plan.swotItems.filter((s) => s.type === 'opportunity');
  const threats = plan.swotItems.filter((s) => s.type === 'threat');

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Top Executive Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                KẾ HOẠCH KINH DOANH NĂM {plan.planningYear}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-300">{plan.industry}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {plan.companyName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              "{plan.strategicSummary || plan.vision}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateStep(1)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chỉnh Sửa Kế Hoạch</span>
            </button>

            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-purple-200 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Cố Vấn AI</span>
            </button>

            <button
              onClick={onViewReport}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo A4</span>
            </button>
          </div>
        </div>

        {/* 4 Macro KPIs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Doanh Thu Dự Toán
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
              {formatVND(summary.totalRevenue, true)}
            </div>
            <span className="text-[11px] text-indigo-300 mt-0.5 block">
              Mục tiêu: {formatVND(plan.annualTargetRevenue, true)}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Lợi Nhuận Ròng (Net Profit)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-400">
              {formatVND(summary.totalNetProfit, true)}
            </div>
            <span className="text-[11px] text-emerald-300 mt-0.5 block">
              Biên ròng: {formatPercent(summary.overallNetMargin)}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Điểm Hòa Vốn (Break-even)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-amber-300">
              {formatVND(summary.breakEvenRevenue, true)}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Biên gộp: {formatPercent(summary.overallGrossMargin)}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Tiến Độ Hành Động Quý
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-indigo-400">
              {actionCompletionRate}%
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {completedActions}/{plan.actionItems.length} sáng kiến hoàn tất
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Vision & Goals vs Financial P&L Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1: Vision, Mission & SMART Goals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>1. Tầm Nhìn, Sứ Mệnh & Mục Tiêu Trọng Tâm</span>
            </h3>
            <button
              onClick={() => onNavigateStep(1)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Chi tiết</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Tầm Nhìn 3-5 Năm
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {plan.vision}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Sứ Mệnh Cốt Lõi
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {plan.mission}
              </p>
            </div>

            {/* Core Values Tag List */}
            <div className="pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Giá Trị Cốt Lõi
              </span>
              <div className="flex flex-wrap gap-1.5">
                {plan.coreValues.map((val, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700 font-medium rounded-lg"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Top 3 SMART Goals */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Tiến Độ Mục Tiêu SMART / OKRs
              </span>
              {plan.smartGoals.slice(0, 3).map((goal) => {
                const prog = goal.targetValue > 0 ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100)) : 0;
                return (
                  <div key={goal.id} className="p-2.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span className="truncate pr-2">{goal.title}</span>
                      <span className="font-mono text-indigo-600 shrink-0">{prog}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${prog}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 5: Financial Realtime Performance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>2. Dự Báo Tài Chính P&L 4 Quý (Real-time)</span>
            </h3>
            <button
              onClick={() => onNavigateStep(5)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Chi tiết</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mini Real-time SVG Bars */}
          <div className="grid grid-cols-4 gap-3 h-40 items-end pb-4 border-b border-slate-100">
            {summary.quarters.map((q) => {
              const maxRev = Math.max(...summary.quarters.map((x) => x.revenue), 1);
              const height = (q.revenue / maxRev) * 100;
              return (
                <div key={q.quarter} className="flex flex-col items-center h-full justify-end">
                  <div
                    className="w-full bg-indigo-600 rounded-t-sm transition-all duration-300"
                    style={{ height: `${Math.max(8, height)}%` }}
                  />
                  <span className="text-[11px] font-bold font-mono text-slate-800 mt-2">
                    {q.quarter}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formatVND(q.revenue, true)}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-emerald-600">
                    +{formatVND(q.netProfit, true)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick P&L Summary Table */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Tổng Doanh Thu Thuần:</span>
              <span className="font-mono font-bold text-slate-900">{formatVND(summary.totalRevenue)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Giá Vốn Hàng Bán (COGS):</span>
              <span className="font-mono text-slate-700">{formatVND(summary.totalCogs)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600 font-semibold">Lợi Nhuận Gộp (Biên {formatPercent(summary.overallGrossMargin)}):</span>
              <span className="font-mono font-bold text-emerald-600">{formatVND(summary.totalGrossProfit)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Chi Phí Vận Hành (OPEX):</span>
              <span className="font-mono text-slate-700">{formatVND(summary.totalOpex)}</span>
            </div>
            <div className="flex justify-between py-1.5 font-bold bg-indigo-50/70 px-2 rounded-lg text-indigo-950">
              <span>Lợi Nhuận Ròng Sau Thuế (Net Profit):</span>
              <span className="font-mono font-extrabold text-indigo-700">{formatVND(summary.totalNetProfit)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: SWOT Snapshot & Marketing 4P Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 2: SWOT Snapshot */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>3. Ma Trận SWOT & Năng Lực Cạnh Tranh</span>
            </h3>
            <button
              onClick={() => onNavigateStep(2)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Chi tiết</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Strengths */}
            <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                Điểm Mạnh ({strengths.length})
              </span>
              <p className="text-xs text-slate-800 line-clamp-3">
                {strengths[0]?.content || 'Chưa cập nhật'}
              </p>
            </div>

            {/* Weaknesses */}
            <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-rose-800 uppercase block">
                Điểm Yếu ({weaknesses.length})
              </span>
              <p className="text-xs text-slate-800 line-clamp-3">
                {weaknesses[0]?.content || 'Chưa cập nhật'}
              </p>
            </div>

            {/* Opportunities */}
            <div className="p-3 bg-sky-50/60 border border-sky-100 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-sky-800 uppercase block">
                Cơ Hội ({opportunities.length})
              </span>
              <p className="text-xs text-slate-800 line-clamp-3">
                {opportunities[0]?.content || 'Chưa cập nhật'}
              </p>
            </div>

            {/* Threats */}
            <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">
                Thách Thức ({threats.length})
              </span>
              <p className="text-xs text-slate-800 line-clamp-3">
                {threats[0]?.content || 'Chưa cập nhật'}
              </p>
            </div>
          </div>

          {/* Top TOWS Strategy */}
          {plan.towsStrategies[0] && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-700">
                  {plan.towsStrategies[0].type}
                </span>
                <span>{plan.towsStrategies[0].title}</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                {plan.towsStrategies[0].description}
              </p>
            </div>
          )}
        </div>

        {/* Step 3: Marketing 4P Snapshot */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>4. Phối Thức Tiếp Thị & Kênh Bán Hàng 4P</span>
            </h3>
            <button
              onClick={() => onNavigateStep(3)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Chi tiết</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Products List */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Sản Phẩm Chủ Lực ({plan.marketing4P.product.items.length})
              </span>
              <div className="space-y-1">
                {plan.marketing4P.product.items.slice(0, 2).map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{prod.name}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{prod.targetSharePercent}% DT</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels List */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Kênh Bán Hàng Trọng Tâm
              </span>
              <div className="space-y-1">
                {plan.marketing4P.place.channels.slice(0, 3).map((chan) => (
                  <div key={chan.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-800">{chan.name}</span>
                    <span className="font-mono font-semibold text-indigo-600">{chan.revenueShare}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-purple-900 block">Ngân Sách Tiếp Thị (Marcom):</span>
                <span className="text-[11px] text-purple-700">Thông điệp: "{plan.marketing4P.promotion.keyMessage}"</span>
              </div>
              <span className="text-sm font-bold font-mono text-purple-900">
                {formatVND(plan.marketing4P.promotion.annualBudget, true)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Action Plan Roadmap Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CalendarRange className="w-4 h-4 text-indigo-600" />
            <span>5. Lộ Trình Sáng Kiến & Kế Hoạch Hành Động 4 Quý</span>
          </h3>
          <button
            onClick={() => onNavigateStep(4)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Quản lý toàn bộ {plan.actionItems.length} đầu việc</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => {
            const qItems = plan.actionItems.filter((i) => i.quarter === q);
            return (
              <div key={q} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-bold text-xs text-slate-800">
                  <span className="font-mono text-indigo-700">{q}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{qItems.length} việc</span>
                </div>
                <div className="space-y-1.5">
                  {qItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-2 bg-white rounded-lg border border-slate-100 text-[11px] space-y-0.5">
                      <div className="font-medium text-slate-800 line-clamp-1">{item.title}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{item.pic}</span>
                        <span className={`font-semibold ${
                          item.status === 'completed' ? 'text-emerald-600' : 'text-slate-500'
                        }`}>
                          {item.status === 'completed' ? 'Đã xong' : item.status === 'in_progress' ? 'Đang làm' : 'Chưa làm'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {qItems.length > 3 && (
                    <div className="text-[10px] text-slate-400 text-center pt-0.5">
                      +{qItems.length - 3} đầu việc khác...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
