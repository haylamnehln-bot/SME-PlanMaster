import { GoogleGenAI } from '@google/genai';
import { BusinessPlan } from '../types/plan';
import { calculateFinancialSummary, formatVND, formatPercent } from '../utils/financialCalculations';

interface GenerateAnalysisParams {
  type: 'executive_summary' | 'financial_audit' | 'growth_initiatives' | 'swot_refinement';
  plan: BusinessPlan;
}

export async function generatePlanAnalysis({ type, plan }: GenerateAnalysisParams): Promise<string> {
  const financialSummary = calculateFinancialSummary(plan.financials);
  
  // Check if API key is present in environment
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

  const planContext = `
Doanh nghiệp: ${plan.companyName}
Ngành nghề: ${plan.industry}
Năm kế hoạch: ${plan.planningYear}
Tầm nhìn: ${plan.vision}
Sứ mệnh: ${plan.mission}
Mục tiêu doanh thu năm: ${formatVND(plan.annualTargetRevenue)} (Dự toán tài chính: ${formatVND(financialSummary.totalRevenue)})
Mục tiêu tỷ suất LN ròng: ${plan.annualTargetNetProfitMargin}% (Dự toán tài chính: ${formatPercent(financialSummary.overallNetMargin)})
Tổng chi phí OPEX: ${formatVND(financialSummary.totalOpex)}
Điểm hòa vốn ước tính: ${formatVND(financialSummary.breakEvenRevenue)}
Điểm mạnh chính: ${plan.swotItems.filter(s => s.type === 'strength').map(s => s.content).join('; ')}
Điểm yếu chính: ${plan.swotItems.filter(s => s.type === 'weakness').map(s => s.content).join('; ')}
Cơ hội: ${plan.swotItems.filter(s => s.type === 'opportunity').map(s => s.content).join('; ')}
Thách thức: ${plan.swotItems.filter(s => s.type === 'threat').map(s => s.content).join('; ')}
Chiến lược sản phẩm: ${plan.marketing4P.product.strategyDescription}
Kênh phân phối: ${plan.marketing4P.place.channels.map(c => `${c.name} (${c.revenueShare}%)`).join(', ')}
Số lượng hành động theo quý: ${plan.actionItems.length} đầu việc.
`;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });

      let prompt = '';
      if (type === 'executive_summary') {
        prompt = `Bạn là một Chuyên gia Cố vấn Chiến lược Doanh nghiệp Cấp cao (Management Consultant) dành cho khối SME tại Việt Nam.
Hãy viết một bản "TÓM TẮT ĐIỀU HÀNH KẾ HOẠCH KINH DOANH NĂM ${plan.planningYear}" (Executive Summary) cho doanh nghiệp sau.
Yêu cầu:
- Phong cách sắc bén, chuyên nghiệp, ngôn ngữ quản trị hiện đại.
- 4 đoạn rõ ràng:
  1. Bối cảnh & Tuyên ngôn Chiến lược
  2. Mục tiêu Trọng tâm & Tăng trưởng
  3. Lợi thế Cạnh tranh & Đòn bẩy Marketing 4P
  4. Dự phóng Hiệu quả Tài chính & Quản trị Thực thi.
- Không dùng ký hiệu giả lập code.

Thông tin doanh nghiệp:
${planContext}`;
      } else if (type === 'financial_audit') {
        prompt = `Bạn là Giám đốc Tài chính (CFO) giàu kinh nghiệm tại Việt Nam.
Hãy đánh giá "SỨC KHỎE TÀI CHÍNH & RỦI RO NGÂN SÁCH" cho kế hoạch kinh doanh sau:
1. Đánh giá tỷ lệ Giá vốn hàng bán (COGS) và Biên lợi nhuận gộp (${formatPercent(financialSummary.overallGrossMargin)}).
2. Đánh giá gánh nặng Chi phí Vận hành (OPEX ${formatPercent(financialSummary.opexPercentageOfRevenue)} doanh thu).
3. Đánh giá tính an toàn của Điểm hòa vốn (${formatVND(financialSummary.breakEvenRevenue)}).
4. Đưa ra 3 cảnh báo rủi ro dòng tiền và 3 biện pháp kiểm soát chi phí thực tế cho SME này.

Thông tin doanh nghiệp:
${planContext}`;
      } else if (type === 'growth_initiatives') {
        prompt = `Bạn là Chuyên gia Tăng trưởng Doanh nghiệp (Growth Strategist) cho SME.
Dựa trên ma trận SWOT và chiến lược 4P của doanh nghiệp này, hãy đề xuất "3 SÁNG KIẾN ĐỘT PHÁ TĂNG TRƯỞNG DOANH THU" cho năm ${plan.planningYear}:
Mỗi sáng kiến cần nêu rõ:
- Tên sáng kiến & Cơ sở logic
- Kênh thực thi & Cách triển khai nhanh trong 30-60 ngày
- Dự kiến tác động lên Doanh thu hoặc Biên lợi nhuận
- Chỉ số KPI đo lường.

Thông tin doanh nghiệp:
${planContext}`;
      } else {
        prompt = `Hãy tối ưu hóa ma trận SWOT và đề xuất các chiến lược phối hợp chéo TOWS (SO, WO, ST, WT) hiệu quả cho doanh nghiệp này.

Thông tin doanh nghiệp:
${planContext}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to heuristic advisor:', err);
    }
  }

  // High-fidelity heuristic advisor (Offline fallback that produces comprehensive, tailored output)
  return generateHeuristicAnalysis(type, plan, financialSummary);
}

function generateHeuristicAnalysis(type: string, plan: BusinessPlan, summary: any): string {
  const isHealthyMargin = summary.overallNetMargin >= 12;
  const isCogsControlled = summary.totalCogs / (summary.totalRevenue || 1) < 0.45;

  if (type === 'executive_summary') {
    return `### TÓM TẮT ĐIỀU HÀNH KẾ HOẠCH KINH DOANH NĂM ${plan.planningYear}
**Đơn vị:** ${plan.companyName} | **Lĩnh vực:** ${plan.industry}

#### 1. Bối cảnh & Tuyên ngôn Chiến lược
Trong bối cảnh thị trường năm ${plan.planningYear} đòi hỏi tính thích ứng cao và tối ưu hóa hiệu suất trên từng đồng vốn, ${plan.companyName} xác lập định hướng phát triển kiên định theo tầm nhìn: "${plan.vision}". Chúng tôi cam kết giải quyết triệt để nhu cầu cốt lõi của khách hàng thông qua sứ mệnh: "${plan.mission}", biến các giá trị cốt lõi thành văn hóa hành động xuyên suốt trong toàn thể đội ngũ.

#### 2. Mục tiêu Kinh doanh Trọng tâm
Kế hoạch năm ${plan.planningYear} được thiết kế với mục tiêu doanh thu tham vọng đạt **${formatVND(plan.annualTargetRevenue)}** (tương ứng dự toán P&L là **${formatVND(summary.totalRevenue)}**), cùng tỷ suất lợi nhuận ròng kỳ vọng đạt **${formatPercent(summary.overallNetMargin)}**. Toàn bộ mục tiêu được phân rã thành các chỉ số OKRs định lượng cho từng phòng ban, hướng đến thu hút **${new Intl.NumberFormat('vi-VN').format(plan.targetNewCustomers)} khách hàng mới** và duy trì tỷ lệ giữ chân khách hàng hiện hữu ở mức **${plan.targetCustomerRetention}%**.

#### 3. Trụ cột Cạnh tranh & Phối thức Tiếp thị 4P
Doanh nghiệp xây dựng vị thế phòng thủ vững chắc dựa trên thế mạnh nổi trội: ${plan.swotItems.find(s => s.type === 'strength')?.content || 'chất lượng sản phẩm và dịch vụ tận tâm'}. Về mặt thương mại, phối thức 4P được đồng bộ hóa với chiến lược sản phẩm chủ lực ("${plan.marketing4P.product.items[0]?.name || 'Sản phẩm chủ lực'}"), định vị giá theo giá trị cảm nhận nhằm giữ vững biên gộp ${formatPercent(summary.overallGrossMargin)}, và phân bổ kênh bán hàng đa dạng dẫn đầu bởi ${plan.marketing4P.place.channels[0]?.name || 'kênh bán hàng trực tiếp'}.

#### 4. Dự toán Tài chính & Quản trị Rủi ro
Dự toán tài chính tổng hợp ghi nhận Tổng Doanh thu thuần đạt **${formatVND(summary.totalRevenue)}**, Lợi nhuận gộp đạt **${formatVND(summary.totalGrossProfit)}**, tổng chi phí vận hành OPEX được kiểm soát ở mức **${formatVND(summary.totalOpex)}** (${formatPercent(summary.opexPercentageOfRevenue)} doanh thu). Doanh nghiệp xác định điểm hòa vốn an toàn tại mức **${formatVND(summary.breakEvenRevenue)}**, đảm bảo an toàn thanh khoản và tạo bước đệm tăng trưởng bền vững cho các năm tiếp theo.`;
  }

  if (type === 'financial_audit') {
    return `### ĐÁNH GIÁ SỨC KHỎE TÀI CHÍNH & QUẢN TRỊ DÒNG TIỀN NĂM ${plan.planningYear}
**Đơn vị:** ${plan.companyName}

#### 1. Đánh giá Cơ cấu Biên Lợi nhuận
- **Biên lợi nhuận gộp:** Đạt **${formatPercent(summary.overallGrossMargin)}** (${formatVND(summary.totalGrossProfit)}). ${isCogsControlled ? 'Đây là mức biên gộp rất tốt so với mặt bằng chung các doanh nghiệp SME, chứng minh lợi thế mua hàng hoặc giá trị gia tăng sản phẩm cao.' : 'Tỷ lệ giá vốn đang ở mức khá cao (trên 45%), doanh nghiệp cần sớm tái đàm phán hợp đồng nhà cung ứng hoặc tối ưu hóa hao hụt định mức sản xuất.'}
- **Biên lợi nhuận ròng:** Đạt **${formatPercent(summary.overallNetMargin)}** (${formatVND(summary.totalNetProfit)}). ${isHealthyMargin ? 'Chỉ số sinh lời ròng rất khả quan, vượt ngưỡng an toàn trung bình ngành (8-10%).' : 'Biên ròng đang mỏng, doanh nghiệp cần theo dõi sát sao từng khoản chi phí phát sinh để tránh rủi ro sụt giảm sang âm khi thị trường chậm.'}

#### 2. Đánh giá Cơ cấu Chi phí Vận hành (OPEX)
- **Tổng OPEX:** ${formatVND(summary.totalOpex)} (chiếm **${formatPercent(summary.opexPercentageOfRevenue)}** tổng doanh thu).
  * Chi phí Lương & Nhân sự: **${formatVND(summary.totalSalaries)}** (${formatPercent((summary.totalSalaries / summary.totalOpex) * 100)} tổng OPEX)
  * Chi phí Thuê mặt bằng & Cơ sở: **${formatVND(summary.totalRent)}**
  * Ngân sách Tiếp thị & Bán hàng: **${formatVND(summary.totalMarketing)}**
  * Quản lý & Vận hành chung: **${formatVND(summary.totalAdmin)}**
  * Dự phòng rủi ro: **${formatVND(summary.totalContingency)}**

#### 3. Phân tích Điểm Hòa Vốn (Break-Even Analysis)
- **Doanh thu hòa vốn cần đạt:** **${formatVND(summary.breakEvenRevenue)}**
- So với doanh thu dự toán (${formatVND(summary.totalRevenue)}), biên độ an toàn (Margin of Safety) đạt khoảng **${formatPercent(((summary.totalRevenue - summary.breakEvenRevenue) / summary.totalRevenue) * 100)}**. Điều này cho thấy doanh nghiệp có thể hấp thụ mức sụt giảm doanh thu đáng kể mà vẫn không bị lỗ hoạt động.

#### 4. Khuyến nghị Thực thi & Kiểm soát Rủi ro
1. **Kiểm soát Dòng tiền Phải thu (DSO):** Siết chặt thời gian thu hồi công nợ đối tác dưới 30 ngày, khuyến khích khách hàng thanh toán sớm bằng chiết khấu 1.5-2%.
2. **Kế toán Quản trị theo Tuần:** Theo dõi doanh thu và chi phí thực tế so với kế hoạch theo chu kỳ hàng tuần, không đợi đến hết tháng/quý mới đối soát.
3. **Quỹ Dự phòng Khẩn cấp:** Đảm bảo duy trì khoản tiền mặt sẵn có tương đương ít nhất 2 tháng chi phí cố định (khoảng ${formatVND((summary.totalSalaries + summary.totalRent) / 6)}).`;
  }

  if (type === 'growth_initiatives') {
    return `### 3 SÁNG KIẾN ĐỘT PHÁ TĂNG TRƯỞNG DOANH THU NĂM ${plan.planningYear}
**Đơn vị:** ${plan.companyName}

#### Sáng kiến 1: Tối ưu Hóa Giá Trị Trọn Đời Khách Hàng (LTV) bằng Mô hình Đóng Gói Combo & Thành Viên
- **Bản chất:** Thay vì chỉ tập trung đốt tiền quảng cáo tìm khách mới (CAC ngày càng đắt đỏ), thiết kế chương trình khách hàng thân thiết với đặc quyền rõ rệt và các gói đóng gói dịch vụ dài hạn / trả trước.
- **Hành động 30 ngày:** Khởi tạo nhóm khách hàng VIP trên Zalo / CRM, tặng voucher ưu đãi cho đơn hàng thứ 2 trong vòng 14 ngày, thử nghiệm gói combo nâng giá trị đơn hàng trung bình (AOV) thêm 20-30%.
- **Tác động dự kiến:** Tăng doanh thu từ khách cũ lên thêm 25-35%, giảm chi phí marketing tổng thể.

#### Sáng kiến 2: Mở Rộng Kênh Bán Hàng Trực Tuyến & Chuyển Đổi Số Kênh Phân Phối
- **Bản chất:** Đẩy mạnh kênh bán hàng có tốc độ tăng trưởng cao (${plan.marketing4P.place.channels[0]?.name || 'kênh TMĐT/Direct'}) kết hợp sáng tạo nội dung video ngắn và tương tác đa điểm chạm.
- **Hành động 30 ngày:** Chuẩn hóa quy trình phản hồi tin nhắn trong vòng dưới 3 phút; thử nghiệm 2 buổi livestream/tuần hoặc chiến dịch email/Zalo ZNS tự động theo hành vi mua sắm.
- **Tác động dự kiến:** Mở rộng tệp khách hàng tiếp cận thêm 40-50% mà không làm tăng định biên nhân sự.

#### Sáng kiến 3: Tinh Gọn Quy Trình Vận Hành & Khóa Định Mức Chi Phí
- **Bản chất:** Ứng dụng công cụ quản lý số hóa để giảm thời gian lãng phí và thất thoát nguyên vật liệu / giờ làm việc.
- **Hành động 30 ngày:** Rà soát lại 3 hợp đồng cung ứng lớn nhất, tiến hành đấu thầu so sánh giá nhập để tiết kiệm 3-5% giá vốn; tự động hóa báo cáo số liệu hàng ngày.
- **Tác động dự kiến:** Cải thiện biên lợi nhuận gộp thêm 2-3 điểm phần trăm ngay trong quý tới.`;
  }

  return `### PHÂN TÍCH CHIẾN LƯỢC TỔNG THỂ
Kế hoạch kinh doanh của ${plan.companyName} đã có sự gắn kết tương đối chặt chẽ giữa Tầm nhìn, Ma trận SWOT, Phối thức Marketing 4P và Lộ trình Hành động. Để đạt được mục tiêu ${formatVND(plan.annualTargetRevenue)}, ban lãnh đạo cần đảm bảo việc giao việc và đo lường OKRs được thực hiện kỷ luật đến từng cấp nhân viên.`;
}
