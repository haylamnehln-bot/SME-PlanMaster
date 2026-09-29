import React, { useState } from 'react';
import { 
  Sparkles, 
  Package, 
  Tag, 
  MapPin, 
  Megaphone, 
  Plus, 
  Trash2,
  DollarSign,
  PieChart
} from 'lucide-react';
import { BusinessPlan, ProductItem, ChannelItem, MarketingCampaign } from '../../types/plan';
import { formatVND } from '../../utils/financialCalculations';

interface Step3Marketing4PProps {
  plan: BusinessPlan;
  onChange: (updated: Partial<BusinessPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Marketing4P: React.FC<Step3Marketing4PProps> = ({
  plan,
  onChange,
  onNext,
  onPrev,
}) => {
  const [activeP, setActiveP] = useState<'product' | 'price' | 'place' | 'promotion'>('product');

  // Product helper
  const [newProd, setNewProd] = useState<Partial<ProductItem>>({
    name: '',
    type: 'core_offer',
    usp: '',
    targetCustomer: '',
    targetSharePercent: 25,
  });

  // Channel helper
  const [newChannel, setNewChannel] = useState<Partial<ChannelItem>>({
    name: '',
    type: 'retail',
    revenueShare: 20,
    conversionRate: 15,
    focusQuarter: 'Q1-Q4',
  });

  // Campaign helper
  const [newCampaign, setNewCampaign] = useState<Partial<MarketingCampaign>>({
    name: '',
    quarter: 'Q1',
    channel: '',
    budget: 100000000,
    expectedLeads: 1000,
    targetCAC: 100000,
  });

  const m4p = plan.marketing4P;

  const handleUpdate4P = (section: 'product' | 'price' | 'place' | 'promotion', data: any) => {
    onChange({
      marketing4P: {
        ...m4p,
        [section]: {
          ...m4p[section],
          ...data,
        },
      },
    });
  };

  const handleAddProduct = () => {
    if (!newProd.name?.trim()) return;
    const item: ProductItem = {
      id: `prod_${Date.now()}`,
      name: newProd.name.trim(),
      type: (newProd.type as any) || 'core_offer',
      usp: newProd.usp || '',
      targetCustomer: newProd.targetCustomer || '',
      targetSharePercent: Number(newProd.targetSharePercent) || 10,
    };
    handleUpdate4P('product', {
      items: [...m4p.product.items, item],
    });
    setNewProd({ name: '', type: 'core_offer', usp: '', targetCustomer: '', targetSharePercent: 20 });
  };

  const handleRemoveProduct = (id: string) => {
    handleUpdate4P('product', {
      items: m4p.product.items.filter((p) => p.id !== id),
    });
  };

  const handleAddChannel = () => {
    if (!newChannel.name?.trim()) return;
    const item: ChannelItem = {
      id: `chan_${Date.now()}`,
      name: newChannel.name.trim(),
      type: (newChannel.type as any) || 'retail',
      revenueShare: Number(newChannel.revenueShare) || 10,
      conversionRate: Number(newChannel.conversionRate) || 10,
      focusQuarter: newChannel.focusQuarter || 'Q1-Q4',
    };
    handleUpdate4P('place', {
      channels: [...m4p.place.channels, item],
    });
    setNewChannel({ name: '', type: 'retail', revenueShare: 20, conversionRate: 15, focusQuarter: 'Q1-Q4' });
  };

  const handleRemoveChannel = (id: string) => {
    handleUpdate4P('place', {
      channels: m4p.place.channels.filter((c) => c.id !== id),
    });
  };

  const handleAddCampaign = () => {
    if (!newCampaign.name?.trim()) return;
    const item: MarketingCampaign = {
      id: `cmp_${Date.now()}`,
      name: newCampaign.name.trim(),
      quarter: (newCampaign.quarter as any) || 'Q1',
      channel: newCampaign.channel || 'Digital Ads',
      budget: Number(newCampaign.budget) || 50000000,
      expectedLeads: Number(newCampaign.expectedLeads) || 500,
      targetCAC: Number(newCampaign.targetCAC) || 100000,
    };
    handleUpdate4P('promotion', {
      campaigns: [...m4p.promotion.campaigns, item],
    });
    setNewCampaign({ name: '', quarter: 'Q1', channel: '', budget: 100000000, expectedLeads: 1000, targetCAC: 100000 });
  };

  const handleRemoveCampaign = (id: string) => {
    handleUpdate4P('promotion', {
      campaigns: m4p.promotion.campaigns.filter((c) => c.id !== id),
    });
  };

  const totalChannelShare = m4p.place.channels.reduce((acc, c) => acc + (c.revenueShare || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Bước 3: Phối thức Tiếp thị & Bán hàng Tích hợp</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Chiến Lược Marketing 4P (Product - Price - Place - Promotion)
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Xây dựng giải pháp toàn diện từ cấu trúc sản phẩm chủ lực, chiến lược giá và biên lợi nhuận, mạng lưới phân phối đến các chiến dịch tiếp thị thúc đẩy doanh số.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              &larr; Bước 2 (SWOT)
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Tiếp sang Bước 4 (Action Plan) &rarr;
            </button>
          </div>
        </div>

        {/* 4P Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveP('product')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeP === 'product'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <Package className="w-4 h-4 text-indigo-600" />
            <span>1. Product (Sản phẩm)</span>
          </button>

          <button
            onClick={() => setActiveP('price')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeP === 'price'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <Tag className="w-4 h-4 text-indigo-600" />
            <span>2. Price (Giá & Biên độ)</span>
          </button>

          <button
            onClick={() => setActiveP('place')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeP === 'place'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>3. Place (Kênh phân phối)</span>
          </button>

          <button
            onClick={() => setActiveP('promotion')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeP === 'promotion'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <Megaphone className="w-4 h-4 text-indigo-600" />
            <span>4. Promotion (Chiêu thị)</span>
          </button>
        </div>
      </div>

      {/* 1. PRODUCT SECTION */}
      {activeP === 'product' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" />
              <span>Cấu Trúc Sản Phẩm & Lợi Điểm Bán Hàng Độc Nhất (USP)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tuyên Bố Chiến Lược Sản Phẩm Chung
              </label>
              <textarea
                rows={2}
                value={m4p.product.strategyDescription}
                onChange={(e) => handleUpdate4P('product', { strategyDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Mô tả triết lý sản phẩm, nhóm sản phẩm chủ lực và định vị phân khúc..."
              />
            </div>
          </div>

          {/* Product Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Danh Mục Sản Phẩm / Dịch Vụ Chủ Lực ({m4p.product.items.length})
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {m4p.product.items.map((item) => (
                <div key={item.id} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.type === 'core_offer'
                          ? 'bg-indigo-100 text-indigo-800'
                          : item.type === 'lead_magnet'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.type === 'core_offer' ? 'Chủ Lực' : item.type === 'lead_magnet' ? 'Sản Phẩm Phễu' : 'Cao Cấp (High-Ticket)'}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>USP:</strong> {item.usp}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Khách hàng mục tiêu: {item.targetCustomer} | Đóng góp doanh thu: {item.targetSharePercent}%
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer self-start sm:self-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Product */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-slate-800">Thêm Sản Phẩm / Dịch Vụ Mới</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="VD: Cà phê đóng gói / Gói tư vấn Retainer..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Loại Sản Phẩm</label>
                  <select
                    value={newProd.type}
                    onChange={(e) => setNewProd({ ...newProd, type: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  >
                    <option value="lead_magnet">Sản phẩm phễu (Thu hút khách)</option>
                    <option value="core_offer">Sản phẩm chủ lực (Core Offer)</option>
                    <option value="high_ticket">Sản phẩm giá trị cao (High Ticket)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">% Doanh thu</label>
                  <input
                    type="number"
                    value={newProd.targetSharePercent || ''}
                    onChange={(e) => setNewProd({ ...newProd, targetSharePercent: Number(e.target.value) })}
                    placeholder="25"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Lợi Điểm Bán Hàng Độc Nhất (USP)</label>
                  <input
                    type="text"
                    value={newProd.usp}
                    onChange={(e) => setNewProd({ ...newProd, usp: e.target.value })}
                    placeholder="Vì sao khách hàng chọn bạn mà không phải đối thủ?"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Đối Tượng Khách Hàng</label>
                  <input
                    type="text"
                    value={newProd.targetCustomer}
                    onChange={(e) => setNewProd({ ...newProd, targetCustomer: e.target.value })}
                    placeholder="VD: Phụ nữ công sở 25-35, Chủ shop online..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                >
                  Thêm Sản Phẩm
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kế Hoạch Nghiên Cứu & Phát Triển (R&D / Đổi Mới Sản Phẩm)
              </label>
              <textarea
                rows={2}
                value={m4p.product.rdInitiatives}
                onChange={(e) => handleUpdate4P('product', { rdInitiatives: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Các tính năng mới, công thức mới hoặc đóng gói chuẩn bị ra mắt trong năm..."
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. PRICE SECTION */}
      {activeP === 'price' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" />
              <span>Chiến Lược Định Giá & Kiểm Soát Biên Lợi Nhuận Gộp</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô Hình Định Giá Chính
                </label>
                <select
                  value={m4p.price.strategyType}
                  onChange={(e) => handleUpdate4P('price', { strategyType: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="value_based">Định giá dựa trên Giá trị (Value-Based Pricing)</option>
                  <option value="cost_plus">Định giá Chi phí cộng biên lãi (Cost-Plus)</option>
                  <option value="penetration">Định giá Thâm nhập thị trường (Penetration)</option>
                  <option value="premium">Định giá Cao cấp / Thương hiệu (Premium)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Biên Lợi Nhuận Gộp Mục Tiêu (Gross Margin %)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={m4p.price.targetGrossMargin}
                    onChange={(e) => handleUpdate4P('price', { targetGrossMargin: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                  />
                  <span className="text-sm font-bold text-slate-600">%</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô Tả Chiến Lược Định Giá & Tối Ưu Hóa Giá Trị Đơn Hàng (AOV)
                </label>
                <textarea
                  rows={3}
                  value={m4p.price.strategyDescription}
                  onChange={(e) => handleUpdate4P('price', { strategyDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  placeholder="Cách định vị khung giá, bán theo combo, chính sách trả trước năm..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chính Sách Chiết Khấu, Khuyến Mãi & Hoa Hồng Kênh
                </label>
                <textarea
                  rows={2}
                  value={m4p.price.discountPolicy}
                  onChange={(e) => handleUpdate4P('price', { discountPolicy: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  placeholder="Quy định giảm giá theo bậc thang, thưởng đại lý, chống phá giá..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PLACE SECTION */}
      {activeP === 'place' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>Kênh Phân Phối & Tỷ Trọng Doanh Thu Bán Hàng</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phân bổ cơ cấu đóng góp doanh thu theo các kênh bán lẻ, online, B2B.
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                  totalChannelShare === 100
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Tổng tỷ trọng: {totalChannelShare}% / 100%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chiến Lược Mạng Lưới Phân Phối
              </label>
              <textarea
                rows={2}
                value={m4p.place.strategyDescription}
                onChange={(e) => handleUpdate4P('place', { strategyDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                placeholder="Mô hình phân phối đa kênh, nhượng quyền, đại lý hay bán trực tiếp..."
              />
            </div>

            {/* Channels Table */}
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {m4p.place.channels.map((chan) => (
                <div key={chan.id} className="p-3.5 bg-white flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900">{chan.name}</span>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Loại hình: <strong>{chan.type}</strong></span>
                      <span>|</span>
                      <span>Tỷ lệ chuyển đổi: <strong>{chan.conversionRate}%</strong></span>
                      <span>|</span>
                      <span>Trọng tâm: <strong>{chan.focusQuarter}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold font-mono text-indigo-700">
                      {chan.revenueShare}% DT
                    </span>
                    <button
                      onClick={() => handleRemoveChannel(chan.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Channel */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-slate-800">Thêm Kênh Phân Phối</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Tên Kênh *</label>
                  <input
                    type="text"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                    placeholder="VD: Cửa hàng offline, TikTok Shop, B2B..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">% Đóng Góp DT</label>
                  <input
                    type="number"
                    value={newChannel.revenueShare || ''}
                    onChange={(e) => setNewChannel({ ...newChannel, revenueShare: Number(e.target.value) })}
                    placeholder="30"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Tỷ lệ Chuyển đổi (%)</label>
                  <input
                    type="number"
                    value={newChannel.conversionRate || ''}
                    onChange={(e) => setNewChannel({ ...newChannel, conversionRate: Number(e.target.value) })}
                    placeholder="15"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={handleAddChannel}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                >
                  Thêm Kênh
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi Chú Vận Hành & Logistics / Giao Vận
              </label>
              <textarea
                rows={2}
                value={m4p.place.logisticsNote}
                onChange={(e) => handleUpdate4P('place', { logisticsNote: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                placeholder="Phương án kho bãi, đối tác vận chuyển hỏa tốc, quản lý tồn kho..."
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. PROMOTION SECTION */}
      {activeP === 'promotion' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-indigo-600" />
              <span>Chiến Dịch Tiếp Thị & Kế Hoạch Truyền Thông (MarCom)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Thông Điệp Truyền Thông Cốt Lõi (Key Message)
                </label>
                <input
                  type="text"
                  value={m4p.promotion.keyMessage}
                  onChange={(e) => handleUpdate4P('promotion', { keyMessage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900"
                  placeholder="Khẩu hiệu hoặc thông điệp định vị khách hàng nhớ đến"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tổng Ngân Sách Tiếp Thị Năm (VND)
                </label>
                <input
                  type="number"
                  value={m4p.promotion.annualBudget}
                  onChange={(e) => handleUpdate4P('promotion', { annualBudget: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Campaigns Table */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Các Chiến Dịch Trọng Điểm Theo Quý ({m4p.promotion.campaigns.length})
                </span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {m4p.promotion.campaigns.map((cmp) => (
                  <div key={cmp.id} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                          {cmp.quarter}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{cmp.name}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Kênh triển khai: <strong>{cmp.channel}</strong> | Ngân sách: <strong>{formatVND(cmp.budget)}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Dự kiến: {cmp.expectedLeads.toLocaleString('vi-VN')} Khách/Lead | Chi phí chuyển đổi (CAC): {formatVND(cmp.targetCAC)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveCampaign(cmp.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer self-start sm:self-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Add Campaign */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-xs font-bold text-slate-800">Thêm Chiến Dịch Mới</span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Tên Chiến Dịch *</label>
                    <input
                      type="text"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="VD: Chiến dịch Tết Sum Vầy / Siêu Sale 11.11..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Quý Triển Khai</label>
                    <select
                      value={newCampaign.quarter}
                      onChange={(e) => setNewCampaign({ ...newCampaign, quarter: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                    >
                      <option value="Q1">Quý 1 (Q1)</option>
                      <option value="Q2">Quý 2 (Q2)</option>
                      <option value="Q3">Quý 3 (Q3)</option>
                      <option value="Q4">Quý 4 (Q4)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Ngân Sách (VND)</label>
                    <input
                      type="number"
                      value={newCampaign.budget || ''}
                      onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number(e.target.value) })}
                      placeholder="100000000"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Kênh Tiếp Thị</label>
                    <input
                      type="text"
                      value={newCampaign.channel}
                      onChange={(e) => setNewCampaign({ ...newCampaign, channel: e.target.value })}
                      placeholder="VD: TikTok Livestream, Meta Ads, Hội thảo..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Lead Dự Kiến</label>
                    <input
                      type="number"
                      value={newCampaign.expectedLeads || ''}
                      onChange={(e) => setNewCampaign({ ...newCampaign, expectedLeads: Number(e.target.value) })}
                      placeholder="1000"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">CAC Mục Tiêu (VND)</label>
                    <input
                      type="number"
                      value={newCampaign.targetCAC || ''}
                      onChange={(e) => setNewCampaign({ ...newCampaign, targetCAC: Number(e.target.value) })}
                      placeholder="100000"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={handleAddCampaign}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                  >
                    Thêm Chiến Dịch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
