import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { BusinessPlan, SmartGoal } from '../../types/plan';
import { formatVND } from '../../utils/financialCalculations';

interface Step1VisionGoalsProps {
  plan: BusinessPlan;
  onChange: (updated: Partial<BusinessPlan>) => void;
  onNext: () => void;
}

export const Step1VisionGoals: React.FC<Step1VisionGoalsProps> = ({
  plan,
  onChange,
  onNext,
}) => {
  const [newValue, setNewValue] = useState('');
  const [newGoal, setNewGoal] = useState<Partial<SmartGoal>>({
    category: 'Doanh thu',
    title: '',
    targetValue: 0,
    currentValue: 0,
    unit: 'VNĐ',
    deadline: '31/12/2026',
    owner: ''
  });
  const [showGoalForm, setShowGoalForm] = useState(false);

  const handleAddCoreValue = () => {
    if (!newValue.trim()) return;
    onChange({
      coreValues: [...plan.coreValues, newValue.trim()]
    });
    setNewValue('');
  };

  const handleRemoveCoreValue = (index: number) => {
    onChange({
      coreValues: plan.coreValues.filter((_, i) => i !== index)
    });
  };

  const handleAddSmartGoal = () => {
    if (!newGoal.title?.trim()) return;
    const goal: SmartGoal = {
      id: `sg_${Date.now()}`,
      category: (newGoal.category as any) || 'Doanh thu',
      title: newGoal.title.trim(),
      targetValue: Number(newGoal.targetValue) || 0,
      currentValue: Number(newGoal.currentValue) || 0,
      unit: newGoal.unit || '',
      deadline: newGoal.deadline || '31/12/2026',
      owner: newGoal.owner || 'Toàn thể đội ngũ'
    };

    onChange({
      smartGoals: [...plan.smartGoals, goal]
    });

    setNewGoal({
      category: 'Doanh thu',
      title: '',
      targetValue: 0,
      currentValue: 0,
      unit: 'VNĐ',
      deadline: '31/12/2026',
      owner: ''
    });
    setShowGoalForm(false);
  };

  const handleRemoveGoal = (id: string) => {
    onChange({
      smartGoals: plan.smartGoals.filter((g) => g.id !== id)
    });
  };

  const handleUpdateGoalCurrent = (id: string, currentVal: number) => {
    onChange({
      smartGoals: plan.smartGoals.map((g) =>
        g.id === id ? { ...g, currentValue: currentVal } : g
      )
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Bước 1: Nền tảng Định hướng & Mục tiêu Chiến lược</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              Tầm Nhìn, Sứ Mệnh & Bộ Chỉ Tiêu SMART / OKRs
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Xác lập kim chỉ nam dài hạn và định lượng hóa các mục tiêu cốt lõi của doanh nghiệp trong năm {plan.planningYear}.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-xs text-slate-400">
              {plan.smartGoals.length} mục tiêu
            </span>
            <button
              onClick={onNext}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Tiếp sang Bước 2 &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* 1. Thông tin Doanh nghiệp & Người lập */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>1. Hồ Sơ Kế Hoạch Doanh Nghiệp</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên Doanh Nghiệp / Công Ty *
            </label>
            <input
              type="text"
              value={plan.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              placeholder="VD: Công ty TNHH Giải Pháp Công Nghệ Toàn Cầu"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lĩnh Vực / Ngành Nghề *
            </label>
            <input
              type="text"
              value={plan.industry}
              onChange={(e) => onChange({ industry: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              placeholder="VD: F&B Chuỗi, B2B SaaS, Bán lẻ..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Năm Tài Chính
            </label>
            <input
              type="number"
              value={plan.planningYear}
              onChange={(e) => onChange({ planningYear: parseInt(e.target.value) || 2026 })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Người Lập Kế Hoạch & Chức Vụ
            </label>
            <input
              type="text"
              value={plan.author}
              onChange={(e) => onChange({ author: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              placeholder="VD: Nguyễn Văn A - Tổng Giám Đốc"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tuyên Ngôn Chiến Lược Năm (Executive Motto)
            </label>
            <input
              type="text"
              value={plan.strategicSummary}
              onChange={(e) => onChange({ strategicSummary: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              placeholder="VD: Tối ưu chi phí vận hành, bùng nổ kênh bán hàng đa kênh"
            />
          </div>
        </div>
      </div>

      {/* 2. Tầm nhìn & Sứ mệnh & Giá trị cốt lõi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tầm nhìn & Sứ mệnh */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>2. Tầm Nhìn & Sứ Mệnh (3 - 5 Năm)</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tầm Nhìn Chiến Lược (Vision)
            </label>
            <textarea
              rows={3}
              value={plan.vision}
              onChange={(e) => onChange({ vision: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors leading-relaxed"
              placeholder="Doanh nghiệp của bạn sẽ trở thành ai trong 3-5 năm tới?"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sứ Mệnh Phục Vụ (Mission)
            </label>
            <textarea
              rows={3}
              value={plan.mission}
              onChange={(e) => onChange({ mission: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors leading-relaxed"
              placeholder="Doanh nghiệp tồn tại để giải quyết nỗi đau gì cho ai và mang lại giá trị gì?"
            />
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>3. Giá Trị Cốt Lõi (Core Values)</span>
          </h3>

          <p className="text-xs text-slate-500">
            Các nguyên tắc định hướng hành vi và văn hóa làm việc của toàn thể đội ngũ.
          </p>

          <div className="space-y-2">
            {plan.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{val}</span>
                </div>
                <button
                  onClick={() => handleRemoveCoreValue(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                  title="Xóa giá trị này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCoreValue()}
              placeholder="Nhập giá trị cốt lõi mới..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
            />
            <button
              onClick={handleAddCoreValue}
              className="px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bộ Chỉ Tiêu Tài Chính Cốt Lõi Năm */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span>4. Bộ Chỉ Tiêu Định Lượng Trọng Tâm Năm {plan.planningYear}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Doanh Thu Mục Tiêu
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={plan.annualTargetRevenue}
                onChange={(e) => onChange({ annualTargetRevenue: Number(e.target.value) || 0 })}
                className="w-full text-base font-bold text-slate-900 bg-white border border-slate-200 rounded-md px-2.5 py-1 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
            <span className="text-[11px] text-indigo-600 font-medium mt-1 block">
              = {formatVND(plan.annualTargetRevenue, true)} VNĐ
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Tỷ Suất LN Ròng Mục Tiêu
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                step="0.5"
                value={plan.annualTargetNetProfitMargin}
                onChange={(e) => onChange({ annualTargetNetProfitMargin: Number(e.target.value) || 0 })}
                className="w-full text-base font-bold text-slate-900 bg-white border border-slate-200 rounded-md px-2.5 py-1 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
              <span className="text-sm font-bold text-slate-500">%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Ước tính LN: {formatVND(plan.annualTargetRevenue * (plan.annualTargetNetProfitMargin / 100), true)}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Khách Hàng Mới Cần Đạt
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={plan.targetNewCustomers}
                onChange={(e) => onChange({ targetNewCustomers: Number(e.target.value) || 0 })}
                className="w-full text-base font-bold text-slate-900 bg-white border border-slate-200 rounded-md px-2.5 py-1 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
              <span className="text-xs font-semibold text-slate-500">Khách</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              ~ {Math.round(plan.targetNewCustomers / 12)} khách/tháng
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Tỷ Lệ Giữ Chân Khách Cũ
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={plan.targetCustomerRetention}
                onChange={(e) => onChange({ targetCustomerRetention: Number(e.target.value) || 0 })}
                className="w-full text-base font-bold text-slate-900 bg-white border border-slate-200 rounded-md px-2.5 py-1 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
              <span className="text-sm font-bold text-slate-500">%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Đo lường mức độ trung thành
            </span>
          </div>
        </div>
      </div>

      {/* 4. Khung Mục Tiêu SMART / OKRs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>5. Danh Sách Mục Tiêu SMART / OKRs Phân Rã</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mục tiêu phải Đạt chuẩn: Cụ thể (Specific) - Đo lường được (Measurable) - Khả thi (Achievable) - Liên quan (Relevant) - Có thời hạn (Time-bound).
            </p>
          </div>

          <button
            onClick={() => setShowGoalForm(!showGoalForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-center"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Mục Tiêu SMART</span>
          </button>
        </div>

        {/* Modal / Form thêm mục tiêu mới */}
        {showGoalForm && (
          <div className="p-4 bg-slate-50 border border-indigo-200 rounded-xl space-y-3">
            <div className="text-xs font-bold text-indigo-900">Khởi Tạo Mục Tiêu SMART Mới</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nhóm Mục Tiêu
                </label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Doanh thu">Doanh thu</option>
                  <option value="Lợi nhuận">Lợi nhuận</option>
                  <option value="Khách hàng">Khách hàng</option>
                  <option value="Vận hành">Vận hành</option>
                  <option value="Nhân sự">Nhân sự</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Tên Mục Tiêu (SMART Title) *
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="VD: Mở rộng thêm 2 chi nhánh mới tại Hà Nội"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Chỉ Tiêu Cần Đạt (Target)
                </label>
                <input
                  type="number"
                  value={newGoal.targetValue || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                  placeholder="VD: 2"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Đã Đạt Hiện Tại
                </label>
                <input
                  type="number"
                  value={newGoal.currentValue || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, currentValue: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                  placeholder="VD: 0"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Đơn Vị Tính
                </label>
                <input
                  type="text"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  placeholder="VD: Cửa hàng, VNĐ, %, Khách..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Hạn Hoàn Thành
                </label>
                <input
                  type="text"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  placeholder="31/12/2026"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Người Chịu Trách Nhiệm (Owner)
                </label>
                <input
                  type="text"
                  value={newGoal.owner}
                  onChange={(e) => setNewGoal({ ...newGoal, owner: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  placeholder="VD: Giám đốc Vận hành (COO)"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowGoalForm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleAddSmartGoal}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer"
              >
                Lưu Mục Tiêu
              </button>
            </div>
          </div>
        )}

        {/* Danh sách mục tiêu đã tạo */}
        <div className="divide-y divide-slate-100">
          {plan.smartGoals.map((goal) => {
            const progress =
              goal.targetValue > 0
                ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
                : 0;

            return (
              <div key={goal.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                      {goal.category}
                    </span>
                    <span className="font-semibold text-slate-900">{goal.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Phụ trách: <strong>{goal.owner}</strong></span>
                    <span>|</span>
                    <span>Hạn: <strong>{goal.deadline}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-mono tabular-nums text-slate-900">
                      <input
                        type="number"
                        value={goal.currentValue}
                        onChange={(e) => handleUpdateGoalCurrent(goal.id, Number(e.target.value) || 0)}
                        className="w-16 px-1.5 py-0.5 text-xs bg-slate-50 border border-slate-200 rounded text-right font-mono"
                        title="Click để cập nhật tiến độ thực tế"
                      />
                      {' / '}
                      <span className="font-bold">{goal.targetValue.toLocaleString('vi-VN')} {goal.unit}</span>
                    </div>
                    <div className="w-32 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      Tiến độ: {progress}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemoveGoal(goal.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
                    title="Xóa mục tiêu này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
