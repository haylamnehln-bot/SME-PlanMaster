import React from 'react';
import { Target, Compass, Sparkles, CalendarRange, TrendingUp, Check } from 'lucide-react';

export interface WizardStepInfo {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WIZARD_STEPS: WizardStepInfo[] = [
  {
    id: 1,
    title: 'Tầm nhìn & Mục tiêu',
    subtitle: 'Định hướng & SMART OKRs',
    icon: Compass,
  },
  {
    id: 2,
    title: 'Phân tích SWOT',
    subtitle: 'Nội lực, Cơ hội & TOWS',
    icon: Target,
  },
  {
    id: 3,
    title: 'Tiếp thị & Bán hàng 4P',
    subtitle: 'Product, Price, Place, Promo',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Kế hoạch Hành động',
    subtitle: 'Lộ trình sáng kiến Q1-Q4',
    icon: CalendarRange,
  },
  {
    id: 5,
    title: 'Dự toán Tài chính',
    subtitle: 'P&L tự động & Biểu đồ',
    icon: TrendingUp,
  },
];

interface WizardStepperProps {
  currentStep: number;
  onSelectStep: (stepId: number) => void;
  completedSteps?: number[];
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep,
  onSelectStep,
  completedSteps = [],
}) => {
  return (
    <div className="w-full bg-white border-b border-slate-200 py-2.5 px-3 sm:px-6 lg:px-8 shadow-xs sticky top-[89px] md:top-[65px] z-30">
      <div className="max-w-7xl mx-auto">
        <div className="flex sm:grid sm:grid-cols-5 gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar snap-x">
          {WIZARD_STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className={`snap-start shrink-0 min-w-[135px] sm:min-w-0 relative flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 border border-indigo-200 shadow-xs'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Bước {step.id}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-bold truncate block ${
                      isActive ? 'text-indigo-950' : 'text-slate-800'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate hidden lg:block">
                    {step.subtitle}
                  </div>
                </div>

                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
