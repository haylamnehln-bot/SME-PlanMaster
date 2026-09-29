import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lightbulb, 
  Flame, 
  Plus, 
  Trash2, 
  ArrowRight,
  GitMerge,
  Layers,
  Sparkles
} from 'lucide-react';
import { BusinessPlan, SwotItem, TowsStrategy } from '../../types/plan';

interface Step2SwotTowsProps {
  plan: BusinessPlan;
  onChange: (updated: Partial<BusinessPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2SwotTows: React.FC<Step2SwotTowsProps> = ({
  plan,
  onChange,
  onNext,
  onPrev,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'tows'>('matrix');
  
  // New SWOT item draft
  const [newItem, setNewItem] = useState<{
    type: 'strength' | 'weakness' | 'opportunity' | 'threat';
    content: string;
    impact: 'high' | 'medium' | 'low';
  }>({
    type: 'strength',
    content: '',
    impact: 'high'
  });

  // New TOWS strategy draft
  const [newTows, setNewTows] = useState<{
    type: 'SO' | 'WO' | 'ST' | 'WT';
    title: string;
    description: string;
  }>({
    type: 'SO',
    title: '',
    description: ''
  });

  const [showAddTows, setShowAddTows] = useState(false);

  const handleAddSwotItem = (type: 'strength' | 'weakness' | 'opportunity' | 'threat') => {
    if (!newItem.content.trim()) return;
    const item: SwotItem = {
      id: `swot_${Date.now()}`,
      type,
      content: newItem.content.trim(),
      impact: newItem.impact
    };
    onChange({
      swotItems: [...plan.swotItems, item]
    });
    setNewItem({ type: 'strength', content: '', impact: 'high' });
  };

  const handleRemoveSwotItem = (id: string) => {
    onChange({
      swotItems: plan.swotItems.filter((i) => i.id !== id)
    });
  };

  const handleAddTows = () => {
    if (!newTows.title.trim()) return;
    const towsItem: TowsStrategy = {
      id: `tows_${Date.now()}`,
      type: newTows.type,
      title: newTows.title.trim(),
      description: newTows.description.trim(),
      relatedItems: []
    };
    onChange({
      towsStrategies: [...plan.towsStrategies, towsItem]
    });
    setNewTows({ type: 'SO', title: '', description: '' });
    setShowAddTows(false);
  };

  const handleRemoveTows = (id: string) => {
    onChange({
      towsStrategies: plan.towsStrategies.filter((t) => t.id !== id)
    });
  };

  const strengths = plan.swotItems.filter((i) => i.type === 'strength');
  const weaknesses = plan.swotItems.filter((i) => i.type === 'weakness');
  const opportunities = plan.swotItems.filter((i) => i.type === 'opportunity');
  const threats = plan.swotItems.filter((i) => i.type === 'threat');

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Bước 2: Phân tích Ma Trận Cạnh Tranh & Chiến Lược Phối Hợp</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Ma Trận SWOT & Định Hình Chiến Lược TOWS
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Đánh giá khách quan năng lực nội tại (Điểm mạnh, Điểm yếu) và môi trường kinh doanh bên ngoài (Cơ hội, Thách thức), từ đó ghép nối thành các chiến lược hành động thực tế.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              &larr; Bước 1
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Tiếp sang Bước 3 (4P) &rarr;
            </button>
          </div>
        </div>

        {/* Tab switch between SWOT and TOWS */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. Ma Trận 4 Ô SWOT ({plan.swotItems.length} ý)
          </button>
          <button
            onClick={() => setActiveTab('tows')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'tows'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Chiến Lược Phối Hợp TOWS ({plan.towsStrategies.length} chiến lược)
          </button>
        </div>
      </div>

      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quadrant 1: Strengths */}
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Điểm Mạnh (Strengths)</h3>
                  <span className="text-[11px] text-slate-400">Nội lực cốt lõi vượt trội</span>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {strengths.length} mục
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {strengths.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs flex items-start justify-between gap-2 group hover:bg-emerald-50"
                >
                  <div className="space-y-1">
                    <p className="text-slate-800 leading-relaxed font-medium">{item.content}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                      Tác động: {item.impact === 'high' ? 'Cao' : item.impact === 'medium' ? 'Vừa' : 'Thấp'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSwotItem(item.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <textarea
                rows={2}
                placeholder="Nhập điểm mạnh mới của công ty..."
                value={newItem.type === 'strength' ? newItem.content : ''}
                onChange={(e) => setNewItem({ ...newItem, type: 'strength', content: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="flex items-center justify-between">
                <select
                  value={newItem.impact}
                  onChange={(e) => setNewItem({ ...newItem, impact: e.target.value as any })}
                  className="px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded"
                >
                  <option value="high">Mức độ: Cao</option>
                  <option value="medium">Mức độ: Vừa</option>
                  <option value="low">Mức độ: Thấp</option>
                </select>
                <button
                  onClick={() => handleAddSwotItem('strength')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Điểm Mạnh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quadrant 2: Weaknesses */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                  W
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Điểm Yếu (Weaknesses)</h3>
                  <span className="text-[11px] text-slate-400">Rào cản & Hạn chế nội tại</span>
                </div>
              </div>
              <span className="text-xs font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                {weaknesses.length} mục
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {weaknesses.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-xs flex items-start justify-between gap-2 group hover:bg-rose-50"
                >
                  <div className="space-y-1">
                    <p className="text-slate-800 leading-relaxed font-medium">{item.content}</p>
                    <span className="text-[10px] text-rose-700 font-semibold uppercase">
                      Tác động: {item.impact === 'high' ? 'Cao' : item.impact === 'medium' ? 'Vừa' : 'Thấp'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSwotItem(item.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <textarea
                rows={2}
                placeholder="Nhập điểm yếu hoặc rào cản cần khắc phục..."
                value={newItem.type === 'weakness' ? newItem.content : ''}
                onChange={(e) => setNewItem({ ...newItem, type: 'weakness', content: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <div className="flex items-center justify-between">
                <select
                  value={newItem.impact}
                  onChange={(e) => setNewItem({ ...newItem, impact: e.target.value as any })}
                  className="px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded"
                >
                  <option value="high">Mức độ: Cao</option>
                  <option value="medium">Mức độ: Vừa</option>
                  <option value="low">Mức độ: Thấp</option>
                </select>
                <button
                  onClick={() => handleAddSwotItem('weakness')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Điểm Yếu</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quadrant 3: Opportunities */}
          <div className="bg-white border border-sky-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs">
                  O
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cơ Hội (Opportunities)</h3>
                  <span className="text-[11px] text-slate-400">Xu hướng & Dư địa thị trường</span>
                </div>
              </div>
              <span className="text-xs font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                {opportunities.length} mục
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {opportunities.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-xs flex items-start justify-between gap-2 group hover:bg-sky-50"
                >
                  <div className="space-y-1">
                    <p className="text-slate-800 leading-relaxed font-medium">{item.content}</p>
                    <span className="text-[10px] text-sky-700 font-semibold uppercase">
                      Tiềm năng: {item.impact === 'high' ? 'Cao' : item.impact === 'medium' ? 'Vừa' : 'Thấp'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSwotItem(item.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <textarea
                rows={2}
                placeholder="Nhập cơ hội thị trường mới..."
                value={newItem.type === 'opportunity' ? newItem.content : ''}
                onChange={(e) => setNewItem({ ...newItem, type: 'opportunity', content: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <div className="flex items-center justify-between">
                <select
                  value={newItem.impact}
                  onChange={(e) => setNewItem({ ...newItem, impact: e.target.value as any })}
                  className="px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded"
                >
                  <option value="high">Tiềm năng: Cao</option>
                  <option value="medium">Tiềm năng: Vừa</option>
                  <option value="low">Tiềm năng: Thấp</option>
                </select>
                <button
                  onClick={() => handleAddSwotItem('opportunity')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Cơ Hội</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quadrant 4: Threats */}
          <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  T
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Thách Thức (Threats)</h3>
                  <span className="text-[11px] text-slate-400">Rủi ro đối thủ & Kinh tế vĩ mô</span>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {threats.length} mục
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {threats.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-xs flex items-start justify-between gap-2 group hover:bg-amber-50"
                >
                  <div className="space-y-1">
                    <p className="text-slate-800 leading-relaxed font-medium">{item.content}</p>
                    <span className="text-[10px] text-amber-700 font-semibold uppercase">
                      Nguy cơ: {item.impact === 'high' ? 'Cao' : item.impact === 'medium' ? 'Vừa' : 'Thấp'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSwotItem(item.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <textarea
                rows={2}
                placeholder="Nhập thách thức hoặc rủi ro bên ngoài..."
                value={newItem.type === 'threat' ? newItem.content : ''}
                onChange={(e) => setNewItem({ ...newItem, type: 'threat', content: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <div className="flex items-center justify-between">
                <select
                  value={newItem.impact}
                  onChange={(e) => setNewItem({ ...newItem, impact: e.target.value as any })}
                  className="px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded"
                >
                  <option value="high">Nguy cơ: Cao</option>
                  <option value="medium">Nguy cơ: Vừa</option>
                  <option value="low">Nguy cơ: Thấp</option>
                </select>
                <button
                  onClick={() => handleAddSwotItem('threat')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Thách Thức</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOWS Strategies Tab */}
      {activeTab === 'tows' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-indigo-600" />
                <span>Ma Trận Chiến Lược Phối Hợp TOWS (Cross-Strategies)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Biến ma trận SWOT thành hành động thực tế bằng cách kết hợp: SO (Tấn công), WO (Cải tiến), ST (Đa dạng hóa), WT (Phòng thủ).
              </p>
            </div>

            <button
              onClick={() => setShowAddTows(!showAddTows)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Chiến Lược TOWS</span>
            </button>
          </div>

          {/* Form thêm TOWS */}
          {showAddTows && (
            <div className="p-4 bg-slate-50 border border-indigo-200 rounded-xl space-y-3">
              <div className="text-xs font-bold text-indigo-900">Khởi Tạo Chiến Lược Phối Hợp Mới</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Cặp Phối Hợp
                  </label>
                  <select
                    value={newTows.type}
                    onChange={(e) => setNewTows({ ...newTows, type: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  >
                    <option value="SO">Chiến lược SO: Dùng Thế mạnh đón Cơ hội (Tấn công)</option>
                    <option value="WO">Chiến lược WO: Khắc phục Điểm yếu đón Cơ hội</option>
                    <option value="ST">Chiến lược ST: Dùng Thế mạnh né Thách thức</option>
                    <option value="WT">Chiến lược WT: Giảm thiểu Điểm yếu & Tránh rủi ro</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Tiêu Đề Chiến Lược *
                  </label>
                  <input
                    type="text"
                    value={newTows.title}
                    onChange={(e) => setNewTows({ ...newTows, title: e.target.value })}
                    placeholder="VD: Chiến lược SO: Hợp tác B2B Office Coffee"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Mô Tả Cách Thức Triển Khai Cụ Thể
                  </label>
                  <textarea
                    rows={2}
                    value={newTows.description}
                    onChange={(e) => setNewTows({ ...newTows, description: e.target.value })}
                    placeholder="Nêu rõ phối hợp các điểm nào trong SWOT và hành động chủ chốt..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddTows(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddTows}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer"
                >
                  Lưu Chiến Lược
                </button>
              </div>
            </div>
          )}

          {/* List of TOWS strategies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.towsStrategies.map((tows) => {
              const badgeStyle =
                tows.type === 'SO'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : tows.type === 'WO'
                  ? 'bg-sky-100 text-sky-800 border-sky-200'
                  : tows.type === 'ST'
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200';

              return (
                <div
                  key={tows.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:bg-white hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${badgeStyle}`}>
                      {tows.type}
                    </span>
                    <button
                      onClick={() => handleRemoveTows(tows.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{tows.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{tows.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
