import React from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  CalendarRange,
  Download
} from 'lucide-react';
import { BusinessPlan } from '../types/plan';
import { calculateFinancialSummary, formatVND, formatPercent } from '../utils/financialCalculations';
import { exportPlanToJson } from '../utils/storage';

interface PrintReportViewProps {
  plan: BusinessPlan;
  onBack: () => void;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({
  plan,
  onBack,
}) => {
  const summary = calculateFinancialSummary(plan.financials);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top action bar (hidden during print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportPlanToJson(plan)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In / Xuất File PDF (A4)</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE DOCUMENT BODY */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm print-shadow-none text-slate-900 space-y-10">
        {/* Cover Header */}
        <div className="border-b-2 border-slate-900 pb-8 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700 block mb-1">
                KẾ HOẠCH KINH DOANH THƯỜNG NIÊN (ANNUAL OPERATING PLAN)
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {plan.companyName}
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Lĩnh vực: {plan.industry} | Năm tài chính: {plan.planningYear}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block font-medium">Người lập kế hoạch:</span>
              <strong className="text-slate-900">{plan.author}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Ngày phê duyệt:</span>
              <strong className="text-slate-900">
                {new Date(plan.lastUpdated).toLocaleDateString('vi-VN')}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Mục tiêu Doanh thu:</span>
              <strong className="text-indigo-700 font-mono">{formatVND(plan.annualTargetRevenue)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Biên LN Ròng Kỳ Vọng:</span>
              <strong className="text-emerald-700 font-mono">{plan.annualTargetNetProfitMargin}%</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Tuyên Bố Chiến Lược & Định Hướng */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-mono">1</span>
            <span>TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-indigo-700">
                Tầm nhìn 3 - 5 năm:
              </strong>
              <p className="text-slate-700 leading-relaxed">{plan.vision}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-indigo-700">
                Sứ mệnh cốt lõi:
              </strong>
              <p className="text-slate-700 leading-relaxed">{plan.mission}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
            <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-indigo-700">
              Giá trị cốt lõi:
            </strong>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {plan.coreValues.map((v, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: SMART OKRs */}
        <section className="space-y-4 print-break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-mono">2</span>
            <span>MỤC TIÊU CHIẾN LƯỢC ĐỊNH LƯỢNG (SMART GOALS / OKRs)</span>
          </h2>

          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-700">
              <tr>
                <th className="p-2.5">Phân loại</th>
                <th className="p-2.5">Tên Mục Tiêu Cụ Thể</th>
                <th className="p-2.5 text-right">Chỉ Tiêu Cần Đạt</th>
                <th className="p-2.5">Thời hạn</th>
                <th className="p-2.5">Phụ trách</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {plan.smartGoals.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-semibold text-indigo-700">{g.category}</td>
                  <td className="p-2.5 text-slate-900 font-medium">{g.title}</td>
                  <td className="p-2.5 text-right font-mono font-bold">{g.targetValue.toLocaleString('vi-VN')} {g.unit}</td>
                  <td className="p-2.5 text-slate-600 font-mono text-[11px]">{g.deadline}</td>
                  <td className="p-2.5 text-slate-600">{g.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 3: SWOT & TOWS */}
        <section className="space-y-4 print-break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-mono">3</span>
            <span>PHÂN TÍCH MA TRẬN SWOT & CHIẾN LƯỢC TOWS</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-emerald-200 rounded-xl bg-emerald-50/30 space-y-2">
              <strong className="text-emerald-900 font-bold block uppercase">Điểm Mạnh (Strengths):</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {plan.swotItems.filter((s) => s.type === 'strength').map((s) => (
                  <li key={s.id}>{s.content}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border border-rose-200 rounded-xl bg-rose-50/30 space-y-2">
              <strong className="text-rose-900 font-bold block uppercase">Điểm Yếu (Weaknesses):</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {plan.swotItems.filter((s) => s.type === 'weakness').map((s) => (
                  <li key={s.id}>{s.content}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border border-sky-200 rounded-xl bg-sky-50/30 space-y-2">
              <strong className="text-sky-900 font-bold block uppercase">Cơ Hội (Opportunities):</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {plan.swotItems.filter((s) => s.type === 'opportunity').map((s) => (
                  <li key={s.id}>{s.content}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border border-amber-200 rounded-xl bg-amber-50/30 space-y-2">
              <strong className="text-amber-900 font-bold block uppercase">Thách Thức (Threats):</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {plan.swotItems.filter((s) => s.type === 'threat').map((s) => (
                  <li key={s.id}>{s.content}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* TOWS Summary */}
          <div className="space-y-2 pt-2">
            <strong className="text-xs font-bold text-slate-800 uppercase block">
              Chiến Lược Phối Hợp Trọng Điểm (TOWS):
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {plan.towsStrategies.map((t) => (
                <div key={t.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="font-mono text-indigo-700">[{t.type}]</span>
                    <span>{t.title}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Marketing 4P */}
        <section className="space-y-4 print-break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-mono">4</span>
            <span>PHỐI THỨC MARKETING & KÊNH BÁN HÀNG 4P</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <strong className="text-slate-900 font-bold block uppercase text-[11px] text-indigo-700">
                Product (Sản phẩm chủ lực):
              </strong>
              <p className="text-slate-700">{plan.marketing4P.product.strategyDescription}</p>
              <div className="space-y-1 pt-1">
                {plan.marketing4P.product.items.map((p) => (
                  <div key={p.id} className="flex justify-between text-[11px]">
                    <span className="font-medium text-slate-800">{p.name} ({p.usp})</span>
                    <span className="font-mono text-slate-500">{p.targetSharePercent}% DT</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <strong className="text-slate-900 font-bold block uppercase text-[11px] text-indigo-700">
                Price (Chiến lược giá & Biên gộp):
              </strong>
              <p className="text-slate-700">{plan.marketing4P.price.strategyDescription}</p>
              <div className="flex justify-between text-[11px] pt-1">
                <span className="text-slate-600">Biên lợi nhuận gộp mục tiêu:</span>
                <span className="font-mono font-bold text-emerald-700">{plan.marketing4P.price.targetGrossMargin}%</span>
              </div>
              <p className="text-[11px] text-slate-500 italic">{plan.marketing4P.price.discountPolicy}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <strong className="text-slate-900 font-bold block uppercase text-[11px] text-indigo-700">
                Place (Kênh phân phối):
              </strong>
              <p className="text-slate-700">{plan.marketing4P.place.strategyDescription}</p>
              <div className="space-y-1 pt-1">
                {plan.marketing4P.place.channels.map((c) => (
                  <div key={c.id} className="flex justify-between text-[11px]">
                    <span className="font-medium text-slate-800">{c.name}</span>
                    <span className="font-mono font-bold text-indigo-600">{c.revenueShare}% DT</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <strong className="text-slate-900 font-bold block uppercase text-[11px] text-indigo-700">
                Promotion (Tiếp thị & Truyền thông):
              </strong>
              <p className="text-slate-700 font-semibold italic">"{plan.marketing4P.promotion.keyMessage}"</p>
              <div className="flex justify-between text-[11px] pt-1">
                <span className="text-slate-600">Tổng ngân sách năm:</span>
                <span className="font-mono font-bold text-slate-900">{formatVND(plan.marketing4P.promotion.annualBudget)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: P&L Statement */}
        <section className="space-y-4 print-break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-mono">5</span>
            <span>BÁO CÁO KẾT QUẢ KINH DOANH DỰ PHÓNG (P&L STATEMENT)</span>
          </h2>

          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden font-mono tabular-nums">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-700 font-sans">
              <tr>
                <th className="p-2.5">Chỉ tiêu (VNĐ)</th>
                <th className="p-2.5 text-right">Q1</th>
                <th className="p-2.5 text-right">Q2</th>
                <th className="p-2.5 text-right">Q3</th>
                <th className="p-2.5 text-right">Q4</th>
                <th className="p-2.5 text-right bg-slate-200 font-extrabold text-slate-900">CẢ NĂM {plan.planningYear}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="font-bold text-slate-900">
                <td className="p-2.5 font-sans">Doanh Thu Thuần</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="p-2.5 text-right">{formatVND(q.revenue, true)}</td>
                ))}
                <td className="p-2.5 text-right bg-slate-100 font-bold">{formatVND(summary.totalRevenue)}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans">Giá Vốn Hàng Bán (COGS)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="p-2.5 text-right">{formatVND(q.cogs, true)}</td>
                ))}
                <td className="p-2.5 text-right bg-slate-100">{formatVND(summary.totalCogs)}</td>
              </tr>
              <tr className="bg-emerald-50/50 font-bold text-emerald-900">
                <td className="p-2.5 font-sans">Lợi Nhuận Gộp (Gross Profit)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="p-2.5 text-right">{formatVND(q.grossProfit, true)}</td>
                ))}
                <td className="p-2.5 text-right bg-emerald-100/70 font-extrabold">{formatVND(summary.totalGrossProfit)}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans">Chi Phí Vận Hành (OPEX)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="p-2.5 text-right">{formatVND(q.totalOpex, true)}</td>
                ))}
                <td className="p-2.5 text-right bg-slate-100">{formatVND(summary.totalOpex)}</td>
              </tr>
              <tr className="bg-indigo-50 font-extrabold text-indigo-950 text-sm">
                <td className="p-3 font-sans">LỢI NHUẬN RÒNG (NET PROFIT)</td>
                {summary.quarters.map((q) => (
                  <td key={q.quarter} className="p-3 text-right">{formatVND(q.netProfit, true)}</td>
                ))}
                <td className="p-3 text-right bg-indigo-100 text-indigo-900 font-black">{formatVND(summary.totalNetProfit)}</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Doanh thu điểm hòa vốn cả năm:</span>
              <strong className="text-slate-900 font-mono text-sm">{formatVND(summary.breakEvenRevenue)}</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Tỷ suất sinh lời ròng (Net Margin):</span>
              <strong className="text-indigo-700 font-mono text-sm">{formatPercent(summary.overallNetMargin)}</strong>
            </div>
          </div>
        </section>

        {/* Section 6: Action Plan Summary */}
        <section className="space-y-4 print-break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-mono">6</span>
            <span>KẾ HOẠCH HÀNH ĐỘNG TRỌNG ĐIỂM (ACTION PLAN)</span>
          </h2>

          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-700">
              <tr>
                <th className="p-2">Quý</th>
                <th className="p-2">Tên Đầu Việc</th>
                <th className="p-2">Phòng ban</th>
                <th className="p-2">Người phụ trách</th>
                <th className="p-2">Hạn chót</th>
                <th className="p-2 text-right">Ngân sách</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {plan.actionItems.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="p-2 font-mono font-bold text-indigo-700">{a.quarter}</td>
                  <td className="p-2 font-medium text-slate-900">{a.title}</td>
                  <td className="p-2 text-slate-600">{a.department}</td>
                  <td className="p-2 text-slate-600">{a.pic}</td>
                  <td className="p-2 text-slate-500 font-mono text-[11px]">{a.deadline}</td>
                  <td className="p-2 text-right font-mono tabular-nums">{formatVND(a.estimatedBudget, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Signatures & Approvals */}
        <section className="pt-8 border-t-2 border-slate-300 print-break-inside-avoid">
          <div className="grid grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-16">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">
                Người Lập Kế Hoạch
              </span>
              <div>
                <strong className="text-slate-900 block">{plan.author}</strong>
                <span className="text-[11px] text-slate-400">Ký & ghi rõ họ tên</span>
              </div>
            </div>

            <div className="space-y-16">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">
                Phụ Trách Tài Chính / Kế Toán
              </span>
              <div>
                <strong className="text-slate-900 block">Kế Toán Trưởng</strong>
                <span className="text-[11px] text-slate-400">Ký & ghi rõ họ tên</span>
              </div>
            </div>

            <div className="space-y-16">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">
                Phê Duyệt Ban Giám Đốc / HĐQT
              </span>
              <div>
                <strong className="text-slate-900 block">Tổng Giám Đốc (CEO)</strong>
                <span className="text-[11px] text-slate-400">Ký tên & đóng dấu</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
