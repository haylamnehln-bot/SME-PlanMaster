import React, { useState, useEffect } from 'react';
import { Header, AppViewMode } from './components/Header';
import { WizardStepper } from './components/WizardStepper';
import { Step1VisionGoals } from './components/steps/Step1VisionGoals';
import { Step2SwotTows } from './components/steps/Step2SwotTows';
import { Step3Marketing4P } from './components/steps/Step3Marketing4P';
import { Step4ActionPlan } from './components/steps/Step4ActionPlan';
import { Step5Financials } from './components/steps/Step5Financials';
import { DashboardView } from './components/DashboardView';
import { PrintReportView } from './components/PrintReportView';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { BloggerEmbedModal } from './components/BloggerEmbedModal';
import { BusinessPlan } from './types/plan';
import { loadCurrentPlan, saveCurrentPlan } from './utils/storage';
import { SAMPLE_PRESETS } from './data/samplePresets';

export default function App() {
  const [plan, setPlan] = useState<BusinessPlan>(() => loadCurrentPlan());
  const [currentView, setCurrentView] = useState<AppViewMode>('wizard');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState<boolean>(false);

  // Auto-save plan on change
  useEffect(() => {
    saveCurrentPlan(plan);
  }, [plan]);

  const handleUpdatePlan = (updated: Partial<BusinessPlan>) => {
    setPlan((prev) => ({
      ...prev,
      ...updated,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleLoadPreset = (presetId: string) => {
    const found = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setPlan(JSON.parse(JSON.stringify(found.data)));
      setCompletedSteps([1, 2, 3, 4, 5]);
    }
  };

  const handleResetPlan = () => {
    const blankPlan: BusinessPlan = {
      id: `plan_${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      companyName: 'Doanh Nghiệp Mới',
      industry: 'Thương mại & Dịch vụ',
      planningYear: 2026,
      author: 'Ban Giám Đốc',
      vision: 'Trở thành doanh nghiệp tiên phong và được tin cậy trong ngành.',
      mission: 'Mang lại giá trị vượt trội và trải nghiệm xuất sắc cho khách hàng.',
      coreValues: ['Chất lượng', 'Tận tâm', 'Sáng tạo', 'Chính trực'],
      strategicSummary: 'Tập trung tối ưu hóa hoạt động và phát triển doanh số ổn định.',
      annualTargetRevenue: 10000000000,
      annualTargetNetProfitMargin: 15,
      targetNewCustomers: 1000,
      targetCustomerRetention: 60,
      smartGoals: [
        {
          id: 'sg_1',
          category: 'Doanh thu',
          title: 'Đạt mốc doanh thu 10 tỷ VNĐ trong năm 2026',
          targetValue: 10000000000,
          currentValue: 0,
          unit: 'VNĐ',
          deadline: '31/12/2026',
          owner: 'Giám đốc Kinh doanh'
        }
      ],
      swotItems: [
        { id: 's_1', type: 'strength', content: 'Đội ngũ tâm huyết và linh hoạt', impact: 'high' },
        { id: 'w_1', type: 'weakness', content: 'Quy trình nội bộ đang trong giai đoạn chuẩn hóa', impact: 'medium' },
        { id: 'o_1', type: 'opportunity', content: 'Nhu cầu thị trường đang phục hồi và mở rộng', impact: 'high' },
        { id: 't_1', type: 'threat', content: 'Cạnh tranh về giá từ các đối thủ lớn', impact: 'medium' }
      ],
      towsStrategies: [
        {
          id: 't_1',
          type: 'SO',
          title: 'Chiến lược SO: Đẩy mạnh chất lượng dịch vụ khách hàng',
          description: 'Phát huy sự linh hoạt của đội ngũ để đáp ứng nhanh nhất nhu cầu thị trường.',
          relatedItems: []
        }
      ],
      marketing4P: {
        product: {
          strategyDescription: 'Tập trung vào dòng sản phẩm đáp ứng chuẩn xác nhu cầu cốt lõi.',
          items: [
            {
              id: 'p_1',
              name: 'Gói Dịch Vụ Chủ Lực',
              type: 'core_offer',
              usp: 'Chất lượng cao, giá thành hợp lý',
              targetCustomer: 'Khách hàng mục tiêu',
              targetSharePercent: 60
            }
          ],
          rdInitiatives: 'Khảo sát và cải tiến định kỳ mỗi quý.'
        },
        price: {
          strategyType: 'value_based',
          strategyDescription: 'Định vị giá hợp lý tương xứng với chất lượng mang lại.',
          targetGrossMargin: 50,
          discountPolicy: 'Chính sách ưu đãi tri ân khách hàng thân thiết.'
        },
        place: {
          strategyDescription: 'Kết hợp bán hàng trực tiếp và kênh trực tuyến.',
          channels: [
            {
              id: 'c_1',
              name: 'Bán Trực Tiếp & Đối Tác',
              type: 'direct',
              revenueShare: 70,
              conversionRate: 20,
              focusQuarter: 'Q1-Q4'
            },
            {
              id: 'c_2',
              name: 'Kênh Online & Mạng Xã Hội',
              type: 'ecommerce',
              revenueShare: 30,
              conversionRate: 10,
              focusQuarter: 'Q1-Q4'
            }
          ],
          logisticsNote: 'Giao nhận và hỗ trợ khách hàng nhanh chóng.'
        },
        promotion: {
          keyMessage: 'Chất Lượng Tận Tâm - Đồng Hành Bền Vững',
          mainChannels: ['Mạng xã hội', 'Giới thiệu khách cũ', 'Sự kiện ngành'],
          annualBudget: 500000000,
          campaigns: [
            {
              id: 'cmp_1',
              name: 'Chiến dịch Khởi động Năm Mới',
              quarter: 'Q1',
              channel: 'Online Ads',
              budget: 120000000,
              expectedLeads: 500,
              targetCAC: 240000
            }
          ]
        }
      },
      actionItems: [
        {
          id: 'act_1',
          title: 'Hoàn thiện quy trình bán hàng và chăm sóc khách hàng',
          quarter: 'Q1',
          department: 'Kinh doanh',
          pic: 'Trưởng phòng Kinh doanh',
          deadline: '31/03/2026',
          priority: 'high',
          status: 'in_progress',
          estimatedBudget: 30000000,
          expectedResult: 'Tăng tỷ lệ chốt đơn thêm 15%'
        }
      ],
      financials: {
        currency: 'VND',
        unitMultiplier: 1,
        quarters: {
          Q1: {
            revenue: 2000000000,
            cogs: 800000000,
            opexSalaries: 450000000,
            opexRent: 150000000,
            opexMarketing: 120000000,
            opexAdmin: 80000000,
            opexContingency: 40000000
          },
          Q2: {
            revenue: 2400000000,
            cogs: 960000000,
            opexSalaries: 480000000,
            opexRent: 150000000,
            opexMarketing: 140000000,
            opexAdmin: 90000000,
            opexContingency: 50000000
          },
          Q3: {
            revenue: 2600000000,
            cogs: 1040000000,
            opexSalaries: 500000000,
            opexRent: 160000000,
            opexMarketing: 120000000,
            opexAdmin: 90000000,
            opexContingency: 50000000
          },
          Q4: {
            revenue: 3000000000,
            cogs: 1200000000,
            opexSalaries: 550000000,
            opexRent: 160000000,
            opexMarketing: 120000000,
            opexAdmin: 100000000,
            opexContingency: 60000000
          }
        },
        sensitivity: {
          revenueGrowthRate: 0,
          cogsRateAdjustment: 0,
          marketingBudgetBoost: 0
        }
      }
    };

    setPlan(blankPlan);
    setWizardStep(1);
    setCurrentView('wizard');
  };

  const handleNextStep = () => {
    if (wizardStep < 5) {
      setWizardStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('dashboard');
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) {
      setWizardStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-16 sm:pb-0">
      {/* 3-Zone Top Navigation Bar */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        plan={plan}
        onLoadPreset={handleLoadPreset}
        onImportPlan={(imported) => {
          setPlan(imported);
          alert('Đã tải thành công kế hoạch kinh doanh!');
        }}
        onOpenAiAdvisor={() => setIsAiModalOpen(true)}
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
        onResetPlan={handleResetPlan}
      />

      {/* Wizard 5-step progress header (only shown in wizard mode) */}
      {currentView === 'wizard' && (
        <WizardStepper
          currentStep={wizardStep}
          onSelectStep={(s) => setWizardStep(s)}
          completedSteps={completedSteps}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode 1: 5-Step Interactive Wizard */}
        {currentView === 'wizard' && (
          <div>
            {wizardStep === 1 && (
              <Step1VisionGoals
                plan={plan}
                onChange={handleUpdatePlan}
                onNext={handleNextStep}
              />
            )}

            {wizardStep === 2 && (
              <Step2SwotTows
                plan={plan}
                onChange={handleUpdatePlan}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}

            {wizardStep === 3 && (
              <Step3Marketing4P
                plan={plan}
                onChange={handleUpdatePlan}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}

            {wizardStep === 4 && (
              <Step4ActionPlan
                plan={plan}
                onChange={handleUpdatePlan}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}

            {wizardStep === 5 && (
              <Step5Financials
                plan={plan}
                onChange={handleUpdatePlan}
                onPrev={handlePrevStep}
                onViewDashboard={() => setCurrentView('dashboard')}
                onViewReport={() => setCurrentView('report')}
              />
            )}
          </div>
        )}

        {/* Mode 2: Executive Dashboard */}
        {currentView === 'dashboard' && (
          <DashboardView
            plan={plan}
            onNavigateStep={(s) => {
              setWizardStep(s);
              setCurrentView('wizard');
            }}
            onViewReport={() => setCurrentView('report')}
            onOpenAiAdvisor={() => setIsAiModalOpen(true)}
          />
        )}

        {/* Mode 3: Printable Executive Report */}
        {currentView === 'report' && (
          <PrintReportView
            plan={plan}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Quiet Non-distracting Footer */}
      <footer className="no-print border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            SME PlanMaster | Hệ thống Xây dựng & Điều hành Kế hoạch Kinh doanh Năm cho Doanh nghiệp Nhỏ và Vừa
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Dữ liệu lưu an toàn trên trình duyệt</span>
            <span>|</span>
            <button
              onClick={() => setCurrentView('wizard')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              5 Bước Chuẩn Hóa
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Bảng Điều Hành
            </button>
          </div>
        </div>
      </footer>

      {/* AI Strategy Advisor Modal */}
      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        plan={plan}
      />

      {/* Blogger / Website Embed & Packaging Modal */}
      <BloggerEmbedModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
        plan={plan}
      />

      {/* Mobile Sticky Thumb Navigation Bar */}
      {currentView === 'wizard' && (
        <div className="no-print fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between sm:hidden shadow-lg">
          <button
            onClick={handlePrevStep}
            disabled={wizardStep === 1}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              wizardStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-700 bg-slate-100 active:bg-slate-200'
            }`}
          >
            &larr; Lùi lại
          </button>
          <span className="text-xs font-bold text-indigo-700 font-mono">
            Bước {wizardStep} / 5
          </span>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 active:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {wizardStep === 5 ? 'Xem Tổng Quan' : 'Tiếp theo \u2192'}
          </button>
        </div>
      )}
    </div>
  );
}
