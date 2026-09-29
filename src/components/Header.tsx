import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Sparkles, 
  Download, 
  Upload, 
  FileText, 
  Layers, 
  LayoutDashboard, 
  Printer, 
  Check, 
  RotateCcw,
  Briefcase,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { BusinessPlan } from '../types/plan';
import { SAMPLE_PRESETS } from '../data/samplePresets';
import { exportPlanToJson, parseImportedJson } from '../utils/storage';

export type AppViewMode = 'wizard' | 'dashboard' | 'report';

interface HeaderProps {
  currentView: AppViewMode;
  onViewChange: (view: AppViewMode) => void;
  plan: BusinessPlan;
  onLoadPreset: (presetId: string) => void;
  onImportPlan: (plan: BusinessPlan) => void;
  onOpenAiAdvisor: () => void;
  onOpenBloggerModal: () => void;
  onResetPlan: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  plan,
  onLoadPreset,
  onImportPlan,
  onOpenAiAdvisor,
  onOpenBloggerModal,
  onResetPlan,
}) => {
  const [showPresetMenu, setShowPresetMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const parsed = parseImportedJson(content);
        if (parsed) {
          onImportPlan(parsed);
          setShowExportMenu(false);
        } else {
          alert('Tệp dữ liệu không hợp lệ. Vui lòng chọn đúng file JSON được xuất từ ứng dụng.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Main top bar flex row */}
        <div className="flex items-center justify-between gap-2">
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 block truncate">
                SME PlanMaster
              </span>
              <span className="text-[10px] text-slate-400 font-medium block truncate">
                {plan.companyName} ({plan.planningYear})
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (hidden on mobile, rendered below in row 2) */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onViewChange('wizard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'wizard'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Quy trình 5 Bước</span>
            </button>

            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Bảng Điều Hành</span>
            </button>

            <button
              onClick={() => onViewChange('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'report'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Báo Cáo & In</span>
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Blogger Embed & HTML Package Button */}
            <button
              onClick={onOpenBloggerModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors cursor-pointer"
              title="Đóng gói đưa vào Blogger / Website"
            >
              <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span className="hidden sm:inline">Blogger</span>
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
              title="Cố vấn Chiến lược Thông minh"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="hidden sm:inline">Cố Vấn AI</span>
            </button>

            {/* Presets Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPresetMenu(!showPresetMenu);
                  setShowExportMenu(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="hidden sm:inline">Mẫu SME</span>
              </button>

              {showPresetMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Chọn mô hình mẫu thực tế
                  </div>
                  {SAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onLoadPreset(preset.id);
                        setShowPresetMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-start gap-2.5 transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">{preset.title}</div>
                        <div className="text-slate-500 text-[11px] leading-tight line-clamp-1">{preset.tagline}</div>
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        if (confirm('Khởi tạo lại kế hoạch trắng cho doanh nghiệp của bạn?')) {
                          onResetPlan();
                          setShowPresetMenu(false);
                        }
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Xóa & Tạo kế hoạch mới từ đầu</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Export Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowExportMenu(!showExportMenu);
                  setShowPresetMenu(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Xuất</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => {
                      exportPlanToJson(plan);
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lưu file kế hoạch (.JSON)</span>
                  </button>

                  <button
                    onClick={() => {
                      onViewChange('report');
                      setShowExportMenu(false);
                      setTimeout(() => window.print(), 250);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-400" />
                    <span>In / Xuất PDF Báo cáo</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenBloggerModal();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-orange-700 hover:bg-orange-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-orange-600" />
                    <span>Đóng gói đưa lên Blogger</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mở tệp JSON từ máy tính</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Row 2 on Mobile screens) */}
        <nav className="flex md:hidden items-center gap-1 mt-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onViewChange('wizard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              currentView === 'wizard'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5 Bước Chuẩn Hóa</span>
          </button>

          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Bảng Điều Hành</span>
          </button>

          <button
            onClick={() => onViewChange('report')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              currentView === 'report'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Báo Cáo A4</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
