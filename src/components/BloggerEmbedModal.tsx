import React, { useState } from 'react';
import { 
  Globe, 
  X, 
  Copy, 
  Check, 
  Download, 
  Code, 
  ExternalLink,
  BookOpen,
  Layers,
  Sparkles
} from 'lucide-react';
import { BusinessPlan } from '../types/plan';

interface BloggerEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: BusinessPlan;
}

export const BloggerEmbedModal: React.FC<BloggerEmbedModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  const [activeTab, setActiveTab] = useState<'iframe' | 'guide' | 'standalone'>('iframe');
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [copiedStandalone, setCopiedStandalone] = useState(false);

  const [copiedFullHtml, setCopiedFullHtml] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // The published web app URL
  const appUrl = window.location.origin;

  // 1. Responsive iFrame Embed Code for Blogger (Best Practice)
  const iframeCode = `<!-- BẮT ĐẦU: Nhúng SME PlanMaster vào Blogger / Blogspot -->
<div style="position: relative; width: 100%; min-height: 850px; height: 90vh; max-width: 100%; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); background-color: #f8fafc; margin: 20px 0;">
  <iframe 
    src="${appUrl}" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    title="SME PlanMaster - Kế hoạch Kinh doanh Năm cho Doanh nghiệp SME"
    allow="clipboard-write; fullscreen"
    loading="lazy">
  </iframe>
</div>
<!-- KẾT THÚC: Nhúng SME PlanMaster -->`;

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2000);
  };

  const handleDownloadStandalone = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/sme-planmaster-standalone.html');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sme-planmaster-standalone.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      window.open('/sme-planmaster-standalone.html', '_blank');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyFullHtml = async () => {
    try {
      const res = await fetch('/sme-planmaster-standalone.html');
      const text = await res.text();
      navigator.clipboard.writeText(text);
      setCopiedFullHtml(true);
      setTimeout(() => setCopiedFullHtml(false), 2000);
    } catch (e) {
      alert('Không thể sao chép trực tiếp, vui lòng tải file HTML về máy.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-xs font-bold text-sm">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Đóng Gói & Đưa Lên Blogger / Blogspot
              </h3>
              <p className="text-[11px] text-slate-500">
                Hướng dẫn tích hợp ứng dụng Kế hoạch Kinh doanh vào trang (Page) của Blogger
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

        {/* Tabs */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-white flex items-center gap-2">
          <button
            onClick={() => setActiveTab('iframe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'iframe'
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>1. Mã Nhúng iFrame (Khuyên Dùng)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Các Bước Đưa Vào Blogger</span>
          </button>

          <button
            onClick={() => setActiveTab('standalone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'standalone'
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>3. Tải File HTML Độc Lập</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: iFrame Code */}
          {activeTab === 'iframe' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong>Vì sao nên dùng Mã Nhúng iFrame cho Blogger?</strong>
                <p className="mt-1 text-[11px] text-blue-800">
                  Blogger thường chặn hoặc lọc các script JavaScript phức tạp của ứng dụng React. Sử dụng mã nhúng iFrame chuẩn Responsive sẽ giúp ứng dụng hoạt động 100% đầy đủ chức năng (biểu đồ thời gian thực, lưu trữ dữ liệu, xuất PDF) trực tiếp ngay trên bài viết hoặc Trang (Page) của bạn mà không hề bị lỗi xung đột giao diện blog!
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Mã HTML Nhúng vào Blogger (Copy & Paste):
                  </span>
                  <button
                    onClick={handleCopyIframe}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    {copiedIframe ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã Sao Chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao Chép Mã HTML</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                  {iframeCode}
                </pre>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>- Link gốc ứng dụng: <span className="font-mono text-indigo-600 font-semibold">{appUrl}</span></p>
                <p>- Chiều cao mặc định: 850px (tự co giãn 100% bề ngang trên cả điện thoại và máy tính).</p>
              </div>
            </div>
          )}

          {/* TAB 2: Step by Step Guide for Blogger */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Hướng Dẫn 4 Bước Chèn Vào Blogger (Blogspot)
              </h4>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Tạo Trang Mới trên Blogger</strong>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Đăng nhập vào <span className="font-mono text-indigo-600 font-semibold">blogger.com</span> &rarr; Chọn blog của bạn &rarr; Ở cột menu bên trái, nhấp vào <strong>"Trang" (Pages)</strong> &rarr; Nhấp <strong>"+ Trang mới" (New Page)</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Chuyển Sang Chế Độ Xem HTML</strong>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Ở góc trên bên trái của trình soạn thảo, nhấp vào biểu tượng hình cây bút chì &rarr; Chọn <strong>"Chế độ xem HTML" (&lt;&gt; HTML view)</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Dán Mã Nhúng HTML</strong>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Dán toàn bộ đoạn mã HTML đã sao chép từ Tab 1 vào khung nội dung trang. Nhập tiêu đề trang (VD: <em>Kế Hoạch Kinh Doanh SME</em>).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Xuất Bản & Thưởng Thức</strong>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Nhấp nút <strong>"Xuất bản" (Publish)</strong>. Trang của bạn sẽ hiển thị trọn vẹn toàn bộ 5 bước lập kế hoạch, biểu đồ nhảy số thời gian thực và tính năng xuất file PDF!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Standalone HTML Download */}
          {activeTab === 'standalone' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Tệp HTML Độc Lập Toàn Phần (Single-file HTML)</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Chúng tôi đã đóng gói sẵn toàn bộ ứng dụng vào 1 file duy nhất <span className="font-mono font-bold">sme-planmaster-standalone.html</span>. File này chứa đầy đủ CSS, JavaScript, 5 bước kế hoạch, 4 bộ dữ liệu mẫu SME và thuật toán P&L tự động. Bạn có thể mở trực tiếp không cần mạng hoặc tải lên bất kỳ host nào (GitHub Pages, Google Drive, Netlify, Cloudflare...).
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Tải Về Tệp sme-planmaster-standalone.html
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Kích thước siêu nhẹ (~45KB), chạy trực tiếp trên mọi trình duyệt Chrome, Safari, Edge, Cốc Cốc.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleDownloadStandalone}
                    disabled={downloading}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloading ? 'Đang tải...' : 'Tải File HTML Ngay (.html)'}</span>
                  </button>

                  <button
                    onClick={handleCopyFullHtml}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    {copiedFullHtml ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Đã Sao Chép Toàn Bộ Mã!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Sao Chép Mã Nguồn HTML</span>
                      </>
                    )}
                  </button>

                  <a
                    href="/sme-planmaster-standalone.html"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở xem thử trong tab mới</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
