import React, { useState } from 'react';
import { 
  CalendarRange, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Columns, 
  List,
  User,
  DollarSign
} from 'lucide-react';
import { BusinessPlan, ActionItem, Quarter, Department, PriorityLevel, ActionStatus } from '../../types/plan';
import { formatVND } from '../../utils/financialCalculations';

interface Step4ActionPlanProps {
  plan: BusinessPlan;
  onChange: (updated: Partial<BusinessPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DEPARTMENTS: Department[] = [
  'BOD',
  'Kinh doanh',
  'Marketing',
  'Sản phẩm & R&D',
  'Vận hành',
  'Nhân sự',
  'Tài chính'
];

export const Step4ActionPlan: React.FC<Step4ActionPlanProps> = ({
  plan,
  onChange,
  onNext,
  onPrev,
}) => {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [showAddForm, setShowAddForm] = useState(false);

  // New action item draft
  const [newItem, setNewItem] = useState<Partial<ActionItem>>({
    title: '',
    quarter: 'Q1',
    department: 'Kinh doanh',
    pic: '',
    deadline: '31/03/2026',
    priority: 'high',
    status: 'pending',
    estimatedBudget: 50000000,
    expectedResult: '',
  });

  const handleAddAction = () => {
    if (!newItem.title?.trim()) return;
    const item: ActionItem = {
      id: `act_${Date.now()}`,
      title: newItem.title.trim(),
      quarter: (newItem.quarter as any) || 'Q1',
      department: (newItem.department as any) || 'Kinh doanh',
      pic: newItem.pic || 'Trưởng bộ phận',
      deadline: newItem.deadline || '31/03/2026',
      priority: (newItem.priority as any) || 'medium',
      status: (newItem.status as any) || 'pending',
      estimatedBudget: Number(newItem.estimatedBudget) || 0,
      expectedResult: newItem.expectedResult || '',
    };

    onChange({
      actionItems: [...plan.actionItems, item],
    });

    setNewItem({
      title: '',
      quarter: 'Q1',
      department: 'Kinh doanh',
      pic: '',
      deadline: '31/03/2026',
      priority: 'high',
      status: 'pending',
      estimatedBudget: 50000000,
      expectedResult: '',
    });
    setShowAddForm(false);
  };

  const handleRemoveAction = (id: string) => {
    onChange({
      actionItems: plan.actionItems.filter((a) => a.id !== id),
    });
  };

  const handleUpdateStatus = (id: string, status: ActionStatus) => {
    onChange({
      actionItems: plan.actionItems.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    });
  };

  // Filter items
  const filteredItems = plan.actionItems.filter((item) => {
    const matchQ = selectedQuarter === 'All' || item.quarter === selectedQuarter;
    const matchDept = selectedDept === 'All' || item.department === selectedDept;
    return matchQ && matchDept;
  });

  const totalBudget = plan.actionItems.reduce((acc, a) => acc + (a.estimatedBudget || 0), 0);
  const completedCount = plan.actionItems.filter((a) => a.status === 'completed').length;
  const inProgressCount = plan.actionItems.filter((a) => a.status === 'in_progress').length;
  const completionRate = plan.actionItems.length > 0 ? Math.round((completedCount / plan.actionItems.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <CalendarRange className="w-4 h-4" />
              <span>Bước 4: Lộ trình Thực thi & Kế hoạch Hành động</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Kế Hoạch Hành Động Theo Quý (Quarterly Action Plan Q1 - Q4)
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Phân bổ các dự án trọng điểm theo từng quý, gắn liền với phòng ban chịu trách nhiệm (PIC), ngân sách triển khai và cam kết kết quả đầu ra đo lường được.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              &larr; Bước 3 (4P)
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Tiếp sang Bước 5 (Tài chính) &rarr;
            </button>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-400 block">Tổng Đầu Việc</span>
            <span className="text-base font-bold text-slate-900 font-mono">{plan.actionItems.length} Sáng kiến</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-400 block">Tỷ Lệ Hoàn Thành</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-indigo-600 font-mono">{completionRate}%</span>
              <span className="text-[10px] text-slate-400">({completedCount} xong, {inProgressCount} đang làm)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl sm:col-span-2">
            <span className="text-[11px] font-semibold text-slate-400 block">Tổng Ngân Sách Thực Thi Dự Kiến</span>
            <span className="text-base font-bold text-slate-900 font-mono">{formatVND(totalBudget)}</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Quarter Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['All', 'Q1', 'Q2', 'Q3', 'Q4'] as Quarter[]).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  selectedQuarter === q
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {q === 'All' ? 'Tất cả Quý' : q}
              </button>
            ))}
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">Tất cả Phòng Ban</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Xem dạng Bảng"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Xem dạng Lộ trình Quý"
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>

          {/* Add Action Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Đầu Việc</span>
          </button>
        </div>
      </div>

      {/* Add Action Modal / Form */}
      {showAddForm && (
        <div className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-md space-y-4">
          <div className="text-sm font-bold text-indigo-950 border-b border-indigo-100 pb-2">
            Khởi Tạo Hành Động / Dự Án Mới
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Tên Đầu Việc / Sáng Kiến *
              </label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="VD: Triển khai chiến dịch Livestream Tết..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Quý Thực Hiện
              </label>
              <select
                value={newItem.quarter}
                onChange={(e) => setNewItem({ ...newItem, quarter: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Q1">Quý 1 (Q1)</option>
                <option value="Q2">Quý 2 (Q2)</option>
                <option value="Q3">Quý 3 (Q3)</option>
                <option value="Q4">Quý 4 (Q4)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Phòng Ban Phụ Trách
              </label>
              <select
                value={newItem.department}
                onChange={(e) => setNewItem({ ...newItem, department: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Người Chịu Trách Nhiệm (PIC)
              </label>
              <input
                type="text"
                value={newItem.pic}
                onChange={(e) => setNewItem({ ...newItem, pic: e.target.value })}
                placeholder="VD: Nguyễn Văn B - Trưởng phòng"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Hạn Chót (Deadline)
              </label>
              <input
                type="text"
                value={newItem.deadline}
                onChange={(e) => setNewItem({ ...newItem, deadline: e.target.value })}
                placeholder="31/03/2026"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Mức Độ Ưu Tiên
              </label>
              <select
                value={newItem.priority}
                onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="high">Ưu tiên Cao (High)</option>
                <option value="medium">Ưu tiên Vừa (Medium)</option>
                <option value="low">Ưu tiên Thấp (Low)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Trạng Thái Ban Đầu
              </label>
              <select
                value={newItem.status}
                onChange={(e) => setNewItem({ ...newItem, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="pending">Chưa bắt đầu</option>
                <option value="in_progress">Đang thực hiện</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="on_hold">Tạm hoãn</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Ngân Sách Dự Kiến (VND)
              </label>
              <input
                type="number"
                value={newItem.estimatedBudget || ''}
                onChange={(e) => setNewItem({ ...newItem, estimatedBudget: Number(e.target.value) })}
                placeholder="50000000"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Kết Quả Đầu Ra Đo Lường Được (Deliverable / Output)
              </label>
              <input
                type="text"
                value={newItem.expectedResult}
                onChange={(e) => setNewItem({ ...newItem, expectedResult: e.target.value })}
                placeholder="VD: Ký kết 20 hợp đồng, doanh thu đạt 500 triệu/tháng..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleAddAction}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer shadow-xs"
            >
              Lưu Đầu Việc
            </button>
          </div>
        </div>
      )}

      {/* 1. TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Quý</th>
                  <th className="py-3 px-4">Đầu Việc / Sáng Kiến</th>
                  <th className="py-3 px-4">Phòng Ban & Phụ Trách</th>
                  <th className="py-3 px-4">Hạn Chót</th>
                  <th className="py-3 px-4 text-right">Ngân Sách</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-center">Xóa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Quarter & Priority */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded font-bold font-mono text-[11px] bg-slate-100 text-slate-700">
                          {item.quarter}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          item.priority === 'high' ? 'bg-rose-500' : item.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                        }`} title={`Ưu tiên: ${item.priority}`} />
                      </div>
                    </td>

                    {/* Title & Expected Result */}
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      {item.expectedResult && (
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          Đầu ra: {item.expectedResult}
                        </div>
                      )}
                    </td>

                    {/* Dept & PIC */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-slate-800 font-medium">{item.department}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{item.pic}</span>
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-600 text-[11px]">
                      {item.deadline}
                    </td>

                    {/* Budget */}
                    <td className="py-3 px-4 whitespace-nowrap text-right font-mono tabular-nums font-semibold text-slate-900">
                      {formatVND(item.estimatedBudget, true)}
                    </td>

                    {/* Status Select */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value as ActionStatus)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer border ${
                          item.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : item.status === 'in_progress'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : item.status === 'on_hold'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="pending">Chưa bắt đầu</option>
                        <option value="in_progress">Đang thực hiện</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="on_hold">Tạm hoãn</option>
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleRemoveAction(item.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. KANBAN / ROADMAP VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(['Q1', 'Q2', 'Q3', 'Q4'] as ('Q1' | 'Q2' | 'Q3' | 'Q4')[]).map((q) => {
            const quarterItems = plan.actionItems.filter((i) => i.quarter === q);
            const qBudget = quarterItems.reduce((acc, i) => acc + (i.estimatedBudget || 0), 0);

            return (
              <div key={q} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs font-mono">
                      {q}
                    </span>
                    <span className="text-xs font-bold text-slate-900">Quý {q.slice(1)}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {quarterItems.length} việc
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Ngân sách: <strong>{formatVND(qBudget, true)}</strong>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
                  {quarterItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:bg-white hover:border-indigo-200 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">
                          {item.department}
                        </span>
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateStatus(item.id, e.target.value as ActionStatus)}
                          className="text-[10px] bg-transparent font-medium text-slate-600 focus:outline-none"
                        >
                          <option value="pending">Chưa làm</option>
                          <option value="in_progress">Đang làm</option>
                          <option value="completed">Đã xong</option>
                          <option value="on_hold">Hoãn</option>
                        </select>
                      </div>

                      <div className="text-xs font-semibold text-slate-900 line-clamp-2">
                        {item.title}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                        <span>{item.pic}</span>
                        <span className="font-mono">{formatVND(item.estimatedBudget, true)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
