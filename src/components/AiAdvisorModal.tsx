import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  FileText, 
  TrendingUp, 
  Lightbulb, 
  ShieldCheck, 
  Copy, 
  Check, 
  Loader2 
} from 'lucide-react';
import { BusinessPlan } from '../types/plan';
import { generatePlanAnalysis } from '../services/geminiService';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: BusinessPlan;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  const [analysisType, setAnalysisType] = useState<
    'executive_summary' | 'financial_audit' | 'growth_initiatives' | 'swot_refinement'
  >('executive_summary');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (
    type: 'executive_summary' | 'financial_audit' | 'growth_initiatives' | 'swot_refinement'
  ) => {
    setAnalysisType(type);
    setLoading(true);
    setResult('');
    try {
      const output = await generatePlanAnalysis({ type, plan });
      setResult(output);
    } catch (err) {
      console.error(err);
      setResult('Đã xảy ra lỗi khi tạo phân tích. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Cố Vấn Chiến Lược Doanh Nghiệp (Strategy Advisor)
              </h3>
              <p className="text-[11px] text-slate-400">
                Phân tích dữ liệu thực tế của {plan.companyName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Type Selectors */}
        <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/30 flex flex-wrap gap-2">
          <button
            onClick={() => handleGenerate('executive_summary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              analysisType === 'executive_summary' && (result || loading)
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Viết Tóm Tắt Điều Hành</span>
          </button>

          <button
            onClick={() => handleGenerate('financial_audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              analysisType === 'financial_audit' && (result || loading)
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Khám Sức Khỏe Tài Chính</span>
          </button>

          <button
            onClick={() => handleGenerate('growth_initiatives')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              analysisType === 'growth_initiatives' && (result || loading)
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>3 Sáng Kiến Tăng Trưởng</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {!result && !loading && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Sẵn sàng phân tích kế hoạch kinh doanh
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Hệ thống sẽ đối soát toàn bộ mục tiêu doanh thu, biên lợi nhuận, ma trận SWOT và phối thức 4P của {plan.companyName} để đưa ra khuyến nghị thực chiến.
              </p>
              <button
                onClick={() => handleGenerate('executive_summary')}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Bắt Đầu Phân Tích &rarr;
              </button>
            </div>
          )}

          {loading && (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-600 font-medium">
                Đang tổng hợp dữ liệu và sinh phân tích chiến lược...
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-purple-900">
                  Kết Quả Phân Tích Chiến Lược
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép nội dung</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-slate-800 leading-relaxed space-y-3 whitespace-pre-wrap font-sans bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
