import { PresetTemplate } from '../types/plan';

export const SAMPLE_PRESETS: PresetTemplate[] = [
  {
    id: 'fnb',
    title: 'Chuỗi F&B & Quán Cà phê Specialty',
    industryName: 'F&B & Ẩm thực',
    tagline: 'Mô hình chuỗi F&B mở rộng 3 điểm bán & tối ưu doanh thu đa kênh',
    description: 'Kế hoạch kinh doanh chi tiết cho chuỗi F&B gồm 3 cửa hàng hiện hữu, mở thêm 2 chi nhánh mới, kết hợp giao hàng Grab/ShopeeFood và bán hạt cà phê đóng gói.',
    data: {
      id: 'fnb_plan_2026',
      lastUpdated: new Date().toISOString(),
      companyName: 'Công ty TNHH Hương Việt Coffee & Bistro',
      industry: 'F&B & Cà phê Specialty',
      planningYear: 2026,
      author: 'Nguyễn Văn Minh - Giám đốc Điều hành (CEO)',
      
      // Step 1
      vision: 'Trở thành thương hiệu cà phê đặc sản và ẩm thực phong cách hiện đại được yêu thích nhất phân khúc gia đình và dân văn phòng trẻ tại TP.HCM & Hà Nội vào năm 2028.',
      mission: 'Mang đến trải nghiệm cà phê mộc đậm đà nguyên bản và không gian kết nối ấm cúng, phục vụ chu đáo bằng nông sản sạch Việt Nam.',
      coreValues: [
        'Chất lượng nông sản bản địa',
        'Tận tâm phục vụ khách hàng',
        'Sáng tạo thực đơn theo mùa',
        'Tối ưu hóa quy trình vận hành'
      ],
      strategicSummary: 'Năm 2026 tập trung mở rộng 2 điểm bán mới tại khu văn phòng trọng điểm, đẩy mạnh kênh B2B cung cấp cà phê hạt cho văn phòng và tối ưu biên lợi nhuận gộp lên 66%.',
      annualTargetRevenue: 18500000000,
      annualTargetNetProfitMargin: 16.5,
      targetNewCustomers: 45000,
      targetCustomerRetention: 68,
      smartGoals: [
        {
          id: 'sg_1',
          category: 'Doanh thu',
          title: 'Đạt mốc tổng doanh thu toàn chuỗi 18,5 tỷ VNĐ (+35% YoY)',
          targetValue: 18500000000,
          currentValue: 13700000000,
          unit: 'VNĐ',
          deadline: '31/12/2026',
          owner: 'CEO & Giám đốc Kinh doanh'
        },
        {
          id: 'sg_2',
          category: 'Vận hành',
          title: 'Khai trương thành công 2 chi nhánh mới tại Quận 1 và Cầu Giấy',
          targetValue: 2,
          currentValue: 0,
          unit: 'Cửa hàng',
          deadline: '30/09/2026',
          owner: 'Giám đốc Vận hành (COO)'
        },
        {
          id: 'sg_3',
          category: 'Khách hàng',
          title: 'Xây dựng tệp khách hàng thành viên Loyalty đạt 25.000 thành viên active',
          targetValue: 25000,
          currentValue: 9200,
          unit: 'Hội viên',
          deadline: '30/11/2026',
          owner: 'Trưởng phòng Marketing'
        },
        {
          id: 'sg_4',
          category: 'Lợi nhuận',
          title: 'Kiểm soát tỷ lệ hao hụt nguyên vật liệu dưới 2,2%',
          targetValue: 2.2,
          currentValue: 3.8,
          unit: '%',
          deadline: '30/06/2026',
          owner: 'Bếp trưởng & Quản lý Kho'
        }
      ],

      // Step 2
      swotItems: [
        { id: 's_1', type: 'strength', content: 'Nguồn cung hạt Arabica Cầu Đất trực tiếp độc quyền, chi phí nhập ổn định và hương vị khác biệt.', impact: 'high' },
        { id: 's_2', type: 'strength', content: 'Điểm đánh giá Google Maps và Foody trung bình 4.7/5 sao với tệp khách trung thành cao.', impact: 'high' },
        { id: 's_3', type: 'strength', content: 'Đội ngũ barista và phục vụ được đào tạo bài bản, quy trình SOP phục vụ bàn nhanh dưới 7 phút.', impact: 'medium' },
        { id: 'w_1', type: 'weakness', content: 'Chi phí thuê mặt bằng trung tâm chiếm tỷ trọng cao (14-16% doanh thu).', impact: 'high' },
        { id: 'w_2', type: 'weakness', content: 'Tỷ lệ luân chuyển nhân sự phục vụ part-time cao, tốn công đào tạo lại.', impact: 'medium' },
        { id: 'w_3', type: 'weakness', content: 'Hệ thống CRM và thẻ thành viên chưa tự động tích hợp đa kênh giữa online và offline.', impact: 'medium' },
        { id: 'o_1', type: 'opportunity', content: 'Xu hướng người tiêu dùng sẵn sàng trả thêm cho sản phẩm cà phê specialty và không gian làm việc.', impact: 'high' },
        { id: 'o_2', type: 'opportunity', content: 'Thị trường tiệc trà hội nghị (catering) và gói cà phê văn phòng B2B đang tăng trưởng 28%/năm.', impact: 'high' },
        { id: 'o_3', type: 'opportunity', content: 'Các ứng dụng đặt đồ ăn (Grab/ShopeeFood) liên tục tung gói khuyến mãi đồng tài trợ cho nhãn hàng VIP.', impact: 'medium' },
        { id: 't_1', type: 'threat', content: 'Sự cạnh tranh gay gắt từ các chuỗi lớn (Highlands, Phúc Long, The Coffee House) và các quán độc lập mới mở.', impact: 'high' },
        { id: 't_2', type: 'threat', content: 'Giá sữa tươi, bơ lạt và bao bì sinh học có xu hướng biến động tăng 8-12%.', impact: 'medium' },
        { id: 't_3', type: 'threat', content: 'Sức mua chung có thể bị thắt chặt trong các tháng sau Tết Nguyên Đán.', impact: 'medium' }
      ],
      towsStrategies: [
        {
          id: 'tows_1',
          type: 'SO',
          title: 'Chiến lược SO: Đẩy mạnh B2B Catering & Specialty Beans',
          description: 'Tận dụng thế mạnh nguồn hạt Arabica Cầu Đất độc quyền và danh tiếng thương hiệu để cung cấp gói cà phê văn phòng cao cấp cho các công ty công nghệ và ngân hàng.',
          relatedItems: ['Nguồn hạt Arabica Cầu Đất', 'Thị trường B2B Catering']
        },
        {
          id: 'tows_2',
          type: 'WO',
          title: 'Chiến lược WO: Số hóa hệ thống CRM & Tích điểm Mini App Zalo',
          description: 'Triển khai Mini App trên Zalo để giải quyết điểm yếu quản lý khách hàng, giúp khách tự tích điểm và đặt bàn, giảm tải áp lực nhân sự giờ cao điểm.',
          relatedItems: ['Chưa tích hợp CRM đa kênh', 'Tối ưu trải nghiệm khách hàng']
        },
        {
          id: 'tows_3',
          type: 'ST',
          title: 'Chiến lược ST: Khóa giá hợp đồng cung ứng nông sản dài hạn',
          description: 'Ký thỏa thuận bao tiêu sản lượng cả năm với hợp tác xã nông nghiệp Lâm Đồng để tránh rủi ro biến động giá nguyên liệu của thị trường.',
          relatedItems: ['Hợp tác xã nông sản', 'Biến động giá nguyên liệu']
        },
        {
          id: 'tows_4',
          type: 'WT',
          title: 'Chiến lược WT: Tinh gọn định biên nhân sự theo ca linh hoạt',
          description: 'Áp dụng phần mềm xếp ca thông minh theo biểu đồ lưu lượng khách thực tế để giảm chi phí nhân sự giờ vắng khách.',
          relatedItems: ['Luân chuyển nhân sự cao', 'Cạnh tranh áp lực chi phí']
        }
      ],

      // Step 3
      marketing4P: {
        product: {
          strategyDescription: 'Thực đơn 3 tầng: Tầng sản phẩm Hero (Cà phê thủ công Pour-over & Cold Brew thảo mộc), Tầng sản phẩm thường nhật (Cà phê phin truyền thống, Bạc xỉu, Trà trái cây), Tầng đồ ăn Bistro nhẹ (Brunch bánh mì nướng, Salad, Pasta).',
          items: [
            { id: 'p_1', name: 'Cold Brew Đặc Sản Hương Việt', type: 'core_offer', usp: 'Ủ lạnh 24h từ hạt Arabica Cầu Đất lên men trái cây tự nhiên', targetCustomer: 'Dân văn phòng, khách sành cà phê', targetSharePercent: 35 },
            { id: 'p_2', name: 'Combo Ăn Sáng & Cà Phê Nhanh (Take-away)', type: 'lead_magnet', usp: 'Bánh mì nướng pate thủ công + Cà phê sạch chỉ trong 3 phút', targetCustomer: 'Khách hàng đi làm buổi sáng', targetSharePercent: 25 },
            { id: 'p_3', name: 'Gói Cà Phê Hạt Rang Mộc & Máy Pha B2B', type: 'high_ticket', usp: 'Cung cấp trọn gói hạt định kỳ hàng tháng kèm bảo trì máy pha miễn phí', targetCustomer: 'Công ty vừa và nhỏ từ 20-100 nhân sự', targetSharePercent: 20 },
            { id: 'p_4', name: 'Thực đơn Bữa Trưa Bistro & Trà Chiều', type: 'core_offer', usp: 'Món ăn nóng chuẩn vị Âu Á kết hợp không gian máy lạnh yên tĩnh', targetCustomer: 'Gặp gỡ đối tác, nhóm bạn công sở', targetSharePercent: 20 }
          ],
          rdInitiatives: 'Nghiên cứu ra mắt 2 bộ sưu tập thức uống theo mùa: Mùa hè (Trà ủ lạnh trái cây nhiệt đới) và Mùa đông (Cà phê quế hồi mật ong Tây Bắc).'
        },
        price: {
          strategyType: 'value_based',
          strategyDescription: 'Định vị giá phân khúc Trung-Cao Cấp (48.000đ - 85.000đ cho thức uống, 75.000đ - 145.000đ cho món Bistro). Sử dụng chiến lược Combo tăng giá trị giỏ hàng trung bình (AOV) từ 62.000đ lên 95.000đ.',
          targetGrossMargin: 66,
          discountPolicy: 'Không giảm giá tràn lan làm mất giá trị thương hiệu. Áp dụng tích điểm thành viên hoàn 5-10% vào ví điểm cho lần sau, ưu đãi sinh nhật và giảm giá 15% giờ thấp điểm (14h - 17h).'
        },
        place: {
          strategyDescription: 'Kết hợp mô hình Bán tại quán (Dine-in) chiếm 55%, Giao hàng trực tuyến (Delivery Apps) chiếm 30%, và B2B cung cấp cà phê gói văn phòng chiếm 15%.',
          channels: [
            { id: 'c_1', name: 'Tại Cửa Hàng (3 Điểm bán hiện hữu + 2 Điểm mới)', type: 'retail', revenueShare: 55, conversionRate: 85, focusQuarter: 'Q1-Q4' },
            { id: 'c_2', name: 'Ứng dụng Giao đồ ăn (GrabFood, ShopeeFood, Baemin)', type: 'ecommerce', revenueShare: 28, conversionRate: 22, focusQuarter: 'Q2-Q4' },
            { id: 'c_3', name: 'Kênh Doanh nghiệp B2B & Đặt hàng Trực tiếp (Zalo OA)', type: 'direct', revenueShare: 17, conversionRate: 40, focusQuarter: 'Q3-Q4' }
          ],
          logisticsNote: 'Hợp tác đội xe nội bộ cho đơn hàng B2B tiệc văn phòng; đơn cá nhân giao hàng qua tích hợp API GrabExpress và Ahamove.'
        },
        promotion: {
          keyMessage: '"Hương Vị Nguyên Bản - Nơi Khởi Nguồn Mọi Ý Tưởng Sáng Tạo"',
          mainChannels: ['TikTok Review Không Gian & Đồ Uống', 'Zalo OA Chăm sóc Khách Cũ', 'Google My Business (Local SEO)', 'KOLs Ẩm thực Food Reviewer', 'Chương trình trải nghiệm Cupping Coffee'],
          annualBudget: 1100000000,
          campaigns: [
            { id: 'cmp_1', name: 'Chiến dịch Tết: "Vị Cà Phê Sum Vầy - Trao Tết Đậm Đà"', quarter: 'Q1', channel: 'TikTok & Facebook Ads', budget: 280000000, expectedLeads: 12000, targetCAC: 25000 },
            { id: 'cmp_2', name: 'Ra mắt BST Đồ Uống Mùa Hè & Khai Trương Điểm Bán Q1', quarter: 'Q2', channel: 'KOL Review & Mini Event', budget: 350000000, expectedLeads: 18000, targetCAC: 22000 },
            { id: 'cmp_3', name: 'Chương trình B2B Office Coffee Pass cho Doanh nghiệp', quarter: 'Q3', channel: 'Direct Sales & LinkedIn Ads', budget: 200000000, expectedLeads: 450, targetCAC: 450000 },
            { id: 'cmp_4', name: 'Lễ Hội Cà Phê Mùa Thu & Khai Trương Điểm Bán Cầu Giấy', quarter: 'Q4', channel: 'Multi-channel', budget: 270000000, expectedLeads: 15000, targetCAC: 24000 }
          ]
        }
      },

      // Step 4
      actionItems: [
        { id: 'act_1', title: 'Khảo sát và ký hợp đồng thuê mặt bằng chi nhánh số 4 tại Quận 1', quarter: 'Q1', department: 'BOD', pic: 'Minh - CEO', deadline: '28/02/2026', priority: 'high', status: 'completed', estimatedBudget: 450000000, expectedResult: 'Hoàn tất hợp đồng thuê tối thiểu 3 năm, diện tích 160m2' },
        { id: 'act_2', title: 'Thiết kế & Thi công nội thất chi nhánh Quận 1', quarter: 'Q2', department: 'Vận hành', pic: 'Tuấn - COO', deadline: '15/04/2026', priority: 'high', status: 'in_progress', estimatedBudget: 850000000, expectedResult: 'Bàn giao mặt bằng hoàn thiện đúng concept và khai trương thử nghiệm' },
        { id: 'act_3', title: 'Xây dựng và tích hợp Zalo Mini App tích điểm tự động', quarter: 'Q1', department: 'Marketing', pic: 'Hà - MKT Lead', deadline: '31/03/2026', priority: 'high', status: 'completed', estimatedBudget: 80000000, expectedResult: 'Ra mắt Mini App có 5.000 user đăng ký trong tháng đầu' },
        { id: 'act_4', title: 'Đào tạo chuẩn hóa SOP dịch vụ và kiểm tra tay nghề Barista đợt 1', quarter: 'Q1', department: 'Nhân sự', pic: 'Thảo - HR Manager', deadline: '25/03/2026', priority: 'medium', status: 'completed', estimatedBudget: 40000000, expectedResult: '100% nhân viên đạt điểm kiểm tra SOP trên 85/100' },
        { id: 'act_5', title: 'Ký thỏa thuận bao tiêu 15 tấn cà phê hạt với HTX Cầu Đất', quarter: 'Q2', department: 'Vận hành', pic: 'Tuấn - COO', deadline: '30/05/2026', priority: 'high', status: 'in_progress', estimatedBudget: 1200000000, expectedResult: 'Cố định giá nhập đầu vào cả năm thấp hơn thị trường tự do 12%' },
        { id: 'act_6', title: 'Triển khai gói B2B Office Coffee cho 30 công ty đối tác', quarter: 'Q3', department: 'Kinh doanh', pic: 'Đức - Sales B2B', deadline: '31/08/2026', priority: 'high', status: 'pending', estimatedBudget: 60000000, expectedResult: 'Ký 20 hợp đồng định kỳ mang về 250 triệu/tháng' },
        { id: 'act_7', title: 'Tìm kiếm địa điểm và thẩm định chi nhánh số 5 tại Hà Nội (Cầu Giấy)', quarter: 'Q3', department: 'BOD', pic: 'Minh - CEO', deadline: '15/09/2026', priority: 'medium', status: 'pending', estimatedBudget: 200000000, expectedResult: 'Chốt vị trí đắc địa gần tổ hợp văn phòng' },
        { id: 'act_8', title: 'Thi công, tuyển dụng và khai trương chi nhánh số 5 tại Hà Nội', quarter: 'Q4', department: 'Vận hành', pic: 'Tuấn - COO', deadline: '15/11/2026', priority: 'high', status: 'pending', estimatedBudget: 900000000, expectedResult: 'Khai trương đạt doanh thu 35 triệu/ngày trong tuần lễ khai trương' },
        { id: 'act_9', title: 'Kiểm toán tài chính cuối năm & Đánh giá hiệu quả P&L từng chi nhánh', quarter: 'Q4', department: 'Tài chính', pic: 'Phương - Kế toán trưởng', deadline: '20/12/2026', priority: 'high', status: 'pending', estimatedBudget: 35000000, expectedResult: 'Báo cáo tài chính chuẩn xác để chia cổ tức và lập ngân sách 2027' }
      ],

      // Step 5
      financials: {
        currency: 'VND',
        unitMultiplier: 1,
        quarters: {
          Q1: {
            revenue: 3800000000,
            cogs: 1292000000, // ~34%
            opexSalaries: 850000000,
            opexRent: 520000000,
            opexMarketing: 280000000,
            opexAdmin: 160000000,
            opexContingency: 80000000
          },
          Q2: {
            revenue: 4400000000,
            cogs: 1452000000, // ~33%
            opexSalaries: 980000000,
            opexRent: 650000000, // thêm chi nhánh 4
            opexMarketing: 350000000,
            opexAdmin: 180000000,
            opexContingency: 90000000
          },
          Q3: {
            revenue: 4900000000,
            cogs: 1568000000, // ~32%
            opexSalaries: 1080000000,
            opexRent: 650000000,
            opexMarketing: 200000000,
            opexAdmin: 190000000,
            opexContingency: 100000000
          },
          Q4: {
            revenue: 5400000000,
            cogs: 1728000000, // ~32%
            opexSalaries: 1250000000,
            opexRent: 820000000, // thêm chi nhánh 5
            opexMarketing: 270000000,
            opexAdmin: 210000000,
            opexContingency: 110000000
          }
        },
        sensitivity: {
          revenueGrowthRate: 0,
          cogsRateAdjustment: 0,
          marketingBudgetBoost: 0
        }
      }
    }
  },
  {
    id: 'saas',
    title: 'Công ty Công nghệ B2B SaaS',
    industryName: 'Công nghệ & Phần mềm',
    tagline: 'Phần mềm ERP/CRM tinh gọn cho doanh nghiệp bán lẻ & sản xuất vừa và nhỏ',
    description: 'Kế hoạch kinh doanh bài bản cho doanh nghiệp công nghệ B2B nhắm đến việc mở rộng doanh thu định kỳ (ARR), tối ưu CAC và mở rộng thị trường miền Trung & Nam.',
    data: {
      id: 'saas_plan_2026',
      lastUpdated: new Date().toISOString(),
      companyName: 'Công ty Cổ phần Công nghệ NexTech Solutions',
      industry: 'Phần mềm B2B SaaS & Chuyển đổi số',
      planningYear: 2026,
      author: 'Trần Hoàng Long - Nhà sáng lập & CEO',
      
      // Step 1
      vision: 'Trở thành nền tảng quản trị vận hành và bán hàng đa kênh số 1 cho 10.000 doanh nghiệp vừa và nhỏ (SME) tại Đông Nam Á vào năm 2030.',
      mission: 'Đơn giản hóa công nghệ để mỗi chủ doanh nghiệp SME có thể quản trị doanh nghiệp minh bạch, ra quyết định bằng dữ liệu thời gian thực.',
      coreValues: [
        'Lấy khách hàng làm trung tâm',
        'Cải tiến sản phẩm liên tục',
        'Bảo mật và tin cậy tuyệt đối',
        'Văn hóa làm việc linh hoạt & tự chủ'
      ],
      strategicSummary: 'Nâng tỷ lệ gia hạn thuê bao (Gross Revenue Retention) lên trên 92%, mở rộng mảng dịch vụ triển khai tích hợp AI, đạt doanh thu 24 tỷ VNĐ với dòng tiền dương vững chắc.',
      annualTargetRevenue: 24000000000,
      annualTargetNetProfitMargin: 22.0,
      targetNewCustomers: 480,
      targetCustomerRetention: 92,
      smartGoals: [
        {
          id: 'sg_s1',
          category: 'Doanh thu',
          title: 'Đạt Doanh thu Thuê bao Định kỳ Năm (ARR) 24 tỷ VNĐ (+55% YoY)',
          targetValue: 24000000000,
          currentValue: 15500000000,
          unit: 'VNĐ',
          deadline: '31/12/2026',
          owner: 'CEO & Head of Sales'
        },
        {
          id: 'sg_s2',
          category: 'Khách hàng',
          title: 'Ký mới 480 khách hàng doanh nghiệp trả phí gói Pro/Enterprise',
          targetValue: 480,
          currentValue: 120,
          unit: 'Doanh nghiệp',
          deadline: '31/12/2026',
          owner: 'Head of Sales & Inbound MKT'
        },
        {
          id: 'sg_s3',
          category: 'Vận hành',
          title: 'Giảm thời gian Onboarding triển khai phần mềm từ 14 ngày xuống 5 ngày',
          targetValue: 5,
          currentValue: 14,
          unit: 'Ngày',
          deadline: '30/06/2026',
          owner: 'Head of Customer Success'
        },
        {
          id: 'sg_s4',
          category: 'Nhân sự',
          title: 'Hoàn thiện năng lực đội ngũ R&D tích hợp module AI gợi ý tồn kho',
          targetValue: 1,
          currentValue: 0,
          unit: 'Module AI',
          deadline: '30/09/2026',
          owner: 'CTO'
        }
      ],

      // Step 2
      swotItems: [
        { id: 's_s1', type: 'strength', content: 'Sản phẩm giao diện tiếng Việt thân thiện, dễ sử dụng hơn các giải pháp quốc tế (Odoo, SAP) với giá chỉ bằng 1/4.', impact: 'high' },
        { id: 's_s2', type: 'strength', content: 'Tích hợp sâu sẵn với các cổng thanh toán, hóa đơn điện tử (VNPT, Viettel, MISA) và đơn vị vận chuyển tại VN.', impact: 'high' },
        { id: 's_s3', type: 'strength', content: 'Đội ngũ hỗ trợ kỹ thuật và chăm sóc khách hàng 24/7 nhiệt tình qua Zalo & Hotline.', impact: 'medium' },
        { id: 'w_s1', type: 'weakness', content: 'Kênh Inbound Marketing còn yếu, phụ thuộc nhiều vào đội ngũ Outbound Direct Sales.', impact: 'high' },
        { id: 'w_s2', type: 'weakness', content: 'Tài liệu hướng dẫn và video tự học (Self-serve) chưa đầy đủ khiến CS tốn nhiều thời gian gọi điện.', impact: 'medium' },
        { id: 'w_s3', type: 'weakness', content: 'Thương hiệu chưa được biết đến rộng rãi ngoài cộng đồng Hà Nội và TP.HCM.', impact: 'medium' },
        { id: 'o_s1', type: 'opportunity', content: 'Chính sách hỗ trợ chuyển đổi số của nhà nước dành cho SME và các hiệp hội ngành nghề.', impact: 'high' },
        { id: 'o_s2', type: 'opportunity', content: 'Nhu cầu ứng dụng AI để phân tích dữ liệu bán hàng và tự động tạo đơn của các chủ shop SME tăng vọt.', impact: 'high' },
        { id: 'o_s3', type: 'opportunity', content: 'Hợp tác phân phối chéo với các ngân hàng thương mại cung cấp gói tài khoản số cho doanh nghiệp.', impact: 'medium' },
        { id: 't_s1', type: 'threat', content: 'Các đối thủ lớn hạ giá bán hoặc tặng kèm phần mềm để tranh giành thị phần.', impact: 'high' },
        { id: 't_s2', type: 'threat', content: 'Chi phí tuyển dụng và giữ chân kỹ sư phần mềm công nghệ cao có xu hướng leo thang.', impact: 'medium' },
        { id: 't_s3', type: 'threat', content: 'Khách hàng SME dễ nợ tiền hoặc ngừng hoạt động kinh doanh khi kinh tế chung gặp khó khăn.', impact: 'high' }
      ],
      towsStrategies: [
        {
          id: 'tows_s1',
          type: 'SO',
          title: 'Chiến lược SO: Đóng gói giải pháp AI Automation & Hợp tác Ngân hàng',
          description: 'Tận dụng ưu thế tích hợp sâu hệ sinh thái nội địa để hợp tác với ngân hàng ra mắt gói "Chuyển Đổi Số Tài Chính - Vận Hành" trọn gói.',
          relatedItems: ['Tích hợp sâu hệ sinh thái', 'Chính sách hỗ trợ chuyển đổi số']
        },
        {
          id: 'tows_s2',
          type: 'WO',
          title: 'Chiến lược WO: Xây dựng Học viện NexTech Academy & Video Onboarding',
          description: 'Tạo chuỗi webinar, cẩm nang quản trị thực chiến và video hướng dẫn ngắn để hút Inbound Lead tự nhiên, giảm gánh nặng hỗ trợ thủ công.',
          relatedItems: ['Inbound MKT còn yếu', 'Tài liệu tự học chưa hoàn thiện']
        },
        {
          id: 'tows_s3',
          type: 'ST',
          title: 'Chiến lược ST: Tập trung vào chất lượng dịch vụ giữ chân khách (Retention)',
          description: 'Không tham gia cuộc chiến giảm giá hủy diệt, thay vào đó nâng cao ROI thực tế cho khách qua tính năng cảnh báo tồn kho và tối ưu dòng tiền.',
          relatedItems: ['Chăm sóc 24/7 thân thiện', 'Đối thủ cạnh tranh giá rẻ']
        },
        {
          id: 'tows_s4',
          type: 'WT',
          title: 'Chiến lược WT: Cơ chế thanh toán trả trước năm có chiết khấu',
          description: 'Khuyến khích hợp đồng 1-2 năm trả trước kèm cam kết bảo lưu để giảm thiểu tỷ lệ rủi ro khách bỏ cuộc giữa chừng.',
          relatedItems: ['Khách dễ nợ tiền', 'Thương hiệu chưa đủ lớn']
        }
      ],

      // Step 3
      marketing4P: {
        product: {
          strategyDescription: 'Mô hình Tiered SaaS: Gói Starter (cho hộ kinh doanh), Gói Professional (cho SME 10-50 nhân sự), Gói Enterprise (tùy biến API theo yêu cầu). Bổ sung module NexAI trợ lý dự báo tồn kho.',
          items: [
            { id: 'ps_1', name: 'NexTech ERP Starter', type: 'lead_magnet', usp: 'Quản lý thu chi và kho hàng chỉ 390.000đ/tháng', targetCustomer: 'Chủ shop, hộ kinh doanh', targetSharePercent: 20 },
            { id: 'ps_2', name: 'NexTech Professional Suite', type: 'core_offer', usp: 'Tự động hóa đơn hàng đa kênh, CRM và kế toán tự động', targetCustomer: 'Công ty SME thương mại & dịch vụ', targetSharePercent: 55 },
            { id: 'ps_3', name: 'NexTech Enterprise Custom & AI Add-on', type: 'high_ticket', usp: 'Tích hợp ERP chuyên sâu, đào tạo tận nơi và SLA bảo mật cao', targetCustomer: 'Doanh nghiệp trên 50 nhân viên', targetSharePercent: 25 }
          ],
          rdInitiatives: 'Phát hành bản cập nhật v3.5 với tính năng tự động đối soát COD và tính năng Chatbot AI tư vấn dữ liệu tồn kho bằng giọng nói trên Mobile.'
        },
        price: {
          strategyType: 'value_based',
          strategyDescription: 'Thuê bao theo năm (Annual Subscription) giúp tối ưu dòng tiền. Biên lợi nhuận gộp phần mềm đạt trên 82%.',
          targetGrossMargin: 82,
          discountPolicy: 'Chiết khấu 2 tháng khi thanh toán trả trước 1 năm; tặng gói khởi tạo dữ liệu trị giá 3.000.000đ cho khách hàng ký hợp đồng trong 7 ngày dùng thử.'
        },
        place: {
          strategyDescription: 'Kênh bán hàng kết hợp Inside Sales (tư vấn online qua Zoom/Google Meet) và mạng lưới Đại lý Đại diện Phần mềm tại các tỉnh thành.',
          channels: [
            { id: 'cs_1', name: 'Đội ngũ Sales B2B Trực tiếp & Demo Online', type: 'direct', revenueShare: 60, conversionRate: 18, focusQuarter: 'Q1-Q4' },
            { id: 'cs_2', name: 'Website Inbound & Đăng ký Dùng thử Miễn phí 14 ngày', type: 'ecommerce', revenueShare: 25, conversionRate: 8, focusQuarter: 'Q1-Q4' },
            { id: 'cs_3', name: 'Đối tác Kế toán & Đại lý Dịch vụ Doanh nghiệp', type: 'partner', revenueShare: 15, conversionRate: 35, focusQuarter: 'Q2-Q4' }
          ],
          logisticsNote: 'Hệ thống hạ tầng Cloud AWS & Viettel IDC, triển khai kích hoạt tài khoản tự động trong vòng 30 giây.'
        },
        promotion: {
          keyMessage: '"Phần Mềm Quản Trị Tinh Gọn - Giải Phóng Chủ Doanh Nghiệp"',
          mainChannels: ['Google Search Ads (từ khóa phần mềm ERP, CRM)', 'Hội thảo / Webinar Quản trị Doanh nghiệp hàng tháng', 'Cộng đồng Chủ Doanh Nghiệp SME', 'LinkedIn & Báo Doanh Nhân Trẻ'],
          annualBudget: 1800000000,
          campaigns: [
            { id: 'cmps_1', name: 'Webinar: "Giải bài toán Quản trị Tồn kho & Dòng tiền 2026"', quarter: 'Q1', channel: 'Webinar & Facebook Lead Ads', budget: 350000000, expectedLeads: 1500, targetCAC: 1200000 },
            { id: 'cmps_2', name: 'Chiến dịch Ra mắt Module AI Dự Báo Doanh Số', quarter: 'Q2', channel: 'PR Báo chí & Email Marketing', budget: 500000000, expectedLeads: 2200, targetCAC: 1100000 },
            { id: 'cmps_3', name: 'Roadshow Kết nối 500 Doanh nghiệp SME tại Đà Nẵng & Cần Thơ', quarter: 'Q3', channel: 'Sự kiện Offline & Hiệp hội Doanh nhân', budget: 450000000, expectedLeads: 800, targetCAC: 1500000 },
            { id: 'cmps_4', name: 'Chiến dịch Khuyến mãi Gia hạn & Nâng cấp Gói Năm', quarter: 'Q4', channel: 'Customer Success & In-app Banner', budget: 500000000, expectedLeads: 1200, targetCAC: 900000 }
          ]
        }
      },

      // Step 4
      actionItems: [
        { id: 'acts_1', title: 'Hoàn thiện kiến trúc cơ sở dữ liệu Cloud v3.5 đảm bảo SLA 99.9%', quarter: 'Q1', department: 'Sản phẩm & R&D', pic: 'Duy - CTO', deadline: '25/03/2026', priority: 'high', status: 'completed', estimatedBudget: 150000000, expectedResult: 'Tốc độ load báo cáo giảm 60%, chịu tải 50.000 req/s' },
        { id: 'acts_2', title: 'Tuyển dụng và đào tạo 8 chuyên viên B2B Solution Sales', quarter: 'Q1', department: 'Nhân sự', pic: 'Lan - HR', deadline: '31/03/2026', priority: 'high', status: 'completed', estimatedBudget: 90000000, expectedResult: 'Đội ngũ sales mới vượt qua bài test sản phẩm và bắt đầu chốt deal' },
        { id: 'acts_3', title: 'Phát hành tính năng NexAI gợi ý đặt hàng tự động theo mùa', quarter: 'Q2', department: 'Sản phẩm & R&D', pic: 'Duy - CTO', deadline: '30/05/2026', priority: 'high', status: 'in_progress', estimatedBudget: 350000000, expectedResult: 'Ra mắt tính năng tạo điểm bán hàng khác biệt (USP)' },
        { id: 'acts_4', title: 'Tổ chức chuỗi 6 hội thảo trực tuyến chuyên đề Chuyển đổi số SME', quarter: 'Q2', department: 'Marketing', pic: 'Hoàng - MKT Lead', deadline: '30/06/2026', priority: 'medium', status: 'in_progress', estimatedBudget: 180000000, expectedResult: 'Thu hút 3.000 chủ doanh nghiệp tham gia, tạo 400 demo request' },
        { id: 'acts_5', title: 'Ký thỏa thuận đại lý chiến lược với 15 công ty dịch vụ kế toán thuế', quarter: 'Q3', department: 'Kinh doanh', pic: 'Tuấn - BD Manager', deadline: '31/08/2026', priority: 'high', status: 'pending', estimatedBudget: 120000000, expectedResult: 'Mỗi đại lý giới thiệu ít nhất 3 khách hàng trả phí/tháng' },
        { id: 'acts_6', title: 'Tối ưu hóa hành trình kích hoạt tài khoản dùng thử (Self-onboarding)', quarter: 'Q3', department: 'Sản phẩm & R&D', pic: 'Huy - Product Designer', deadline: '30/09/2026', priority: 'medium', status: 'pending', estimatedBudget: 80000000, expectedResult: 'Tỷ lệ chuyển đổi dùng thử sang trả phí tăng từ 8% lên 12%' },
        { id: 'acts_7', title: 'Chiến dịch Tri ân Khách hàng & Ký hợp đồng gia hạn gói 2 năm', quarter: 'Q4', department: 'Kinh doanh', pic: 'Hương - CS Lead', deadline: '15/12/2026', priority: 'high', status: 'pending', estimatedBudget: 250000000, expectedResult: 'Đạt tỷ lệ gia hạn thuê bao 93%, thu trước dòng tiền 8 tỷ' }
      ],

      // Step 5
      financials: {
        currency: 'VND',
        unitMultiplier: 1,
        quarters: {
          Q1: {
            revenue: 4800000000,
            cogs: 864000000, // ~18% (Cloud AWS, license bên thứ 3)
            opexSalaries: 1950000000, // R&D, Sales, CS lương cao
            opexRent: 320000000,
            opexMarketing: 420000000,
            opexAdmin: 150000000,
            opexContingency: 90000000
          },
          Q2: {
            revenue: 5800000000,
            cogs: 1044000000,
            opexSalaries: 2200000000,
            opexRent: 320000000,
            opexMarketing: 480000000,
            opexAdmin: 170000000,
            opexContingency: 110000000
          },
          Q3: {
            revenue: 6400000000,
            cogs: 1152000000,
            opexSalaries: 2350000000,
            opexRent: 340000000,
            opexMarketing: 450000000,
            opexAdmin: 180000000,
            opexContingency: 120000000
          },
          Q4: {
            revenue: 7000000000,
            cogs: 1260000000,
            opexSalaries: 2500000000, // Thưởng cuối năm
            opexRent: 340000000,
            opexMarketing: 450000000,
            opexAdmin: 200000000,
            opexContingency: 140000000
          }
        },
        sensitivity: {
          revenueGrowthRate: 0,
          cogsRateAdjustment: 0,
          marketingBudgetBoost: 0
        }
      }
    }
  },
  {
    id: 'retail',
    title: 'Bán lẻ Đa kênh & Thương mại Điện tử',
    industryName: 'Bán lẻ & E-commerce',
    tagline: 'Phát triển thương hiệu thời trang thiết kế kết hợp TikTok Shop, Shopee và Chuỗi Showroom',
    description: 'Kế hoạch kinh doanh cho nhãn hàng thời trang thiết kế công sở hiện đại, tận dụng livestream bán hàng, sàn thương mại điện tử và nâng cấp trải nghiệm tại showroom.',
    data: {
      id: 'retail_plan_2026',
      lastUpdated: new Date().toISOString(),
      companyName: 'Công ty TNHH Thời Trang LuxeWear Việt Nam',
      industry: 'Thời trang & Bán lẻ Đa kênh (Omnichannel)',
      planningYear: 2026,
      author: 'Lê Mai Anh - Nhà sáng lập & Giám đốc Sáng tạo',
      
      // Step 1
      vision: 'Trở thành thương hiệu thời trang ứng dụng cao cấp hàng đầu dành cho phụ nữ hiện đại tại Việt Nam với trải nghiệm mua sắm đa kênh liền mạch.',
      mission: 'Tôn vinh vẻ đẹp thanh lịch, tự tin của người phụ nữ Việt Nam thông qua những thiết kế tinh tế, chất liệu bền vững và dịch vụ thấu hiểu.',
      coreValues: [
        'Tinh tế trong từng đường may',
        'Chất liệu thân thiện & bền bỉ',
        'Lắng nghe và chiều chuộng khách hàng',
        'Tốc độ bắt nhịp xu hướng'
      ],
      strategicSummary: 'Đạt mốc doanh thu 32 tỷ VNĐ nhờ bùng nổ kênh TikTok Shop & Shopee Mall, đồng thời mở thêm 1 Flagship Store tại trung tâm TP.HCM để nâng tầm giá trị thương hiệu.',
      annualTargetRevenue: 32000000000,
      annualTargetNetProfitMargin: 15.2,
      targetNewCustomers: 65000,
      targetCustomerRetention: 42,
      smartGoals: [
        {
          id: 'sg_r1',
          category: 'Doanh thu',
          title: 'Tổng doanh thu toàn hệ thống đạt 32 tỷ VNĐ (+40% YoY)',
          targetValue: 32000000000,
          currentValue: 22800000000,
          unit: 'VNĐ',
          deadline: '31/12/2026',
          owner: 'CEO & Head of Sales'
        },
        {
          id: 'sg_r2',
          category: 'Khách hàng',
          title: 'Tăng lượng đơn hàng trung bình mỗi tháng lên 8.500 đơn hàng',
          targetValue: 8500,
          currentValue: 5600,
          unit: 'Đơn hàng/tháng',
          deadline: '30/11/2026',
          owner: 'E-commerce Manager'
        },
        {
          id: 'sg_r3',
          category: 'Vận hành',
          title: 'Giảm tỷ lệ trả hàng (Return Rate) trên sàn TMĐT từ 12% xuống dưới 6.5%',
          targetValue: 6.5,
          currentValue: 12,
          unit: '%',
          deadline: '30/06/2026',
          owner: 'Trưởng phòng QC & CSKH'
        },
        {
          id: 'sg_r4',
          category: 'Lợi nhuận',
          title: 'Tối ưu chi phí quảng cáo bán hàng (ACOS/ROAS) đạt tỷ suất ROAS > 4.2x',
          targetValue: 4.2,
          currentValue: 3.1,
          unit: 'Lần (ROAS)',
          deadline: '30/09/2026',
          owner: 'Performance Marketing Lead'
        }
      ],

      // Step 2
      swotItems: [
        { id: 's_r1', type: 'strength', content: 'Xưởng may mẫu và đội ngũ thiết kế riêng, có khả năng ra mắt BST mới chỉ trong 10-14 ngày.', impact: 'high' },
        { id: 's_r2', type: 'strength', content: 'Kênh TikTok có 450.000 followers và đội ngũ KOC/Host Livestream cố định có tương tác cao.', impact: 'high' },
        { id: 's_r3', type: 'strength', content: 'Chất liệu vải lụa tơ tằm và sợi organic nguồn gốc rõ ràng, khách hàng khen ngợi về form dáng.', impact: 'medium' },
        { id: 'w_r1', type: 'weakness', content: 'Quản lý tồn kho SKU giữa các kênh online và cửa hàng vật lý đôi khi bị lệch số liệu.', impact: 'high' },
        { id: 'w_r2', type: 'weakness', content: 'Phụ thuộc vào chi phí quảng cáo trả phí (TikTok Ads / Meta Ads) trong các đợt Siêu Sale.', impact: 'high' },
        { id: 'w_r3', type: 'weakness', content: 'Không gian showroom hiện tại hơi nhỏ, chưa tạo được trải nghiệm VIP cho khách hàng trung lưu.', impact: 'medium' },
        { id: 'o_r1', type: 'opportunity', content: 'Mua sắm qua Livestream kết hợp giải trí (Shoppertainment) đang là xu hướng tăng trưởng bùng nổ.', impact: 'high' },
        { id: 'o_r2', type: 'opportunity', content: 'Xu hướng phụ nữ công sở chuộng phong cách Quiet Luxury (sang trọng thầm lặng, thanh lịch).', impact: 'high' },
        { id: 'o_r3', type: 'opportunity', content: 'Cơ hội xuất khẩu sang thị trường lân cận (Thái Lan, Malaysia) qua Shopee Quốc Tế.', impact: 'medium' },
        { id: 't_r1', type: 'threat', content: 'Hàng giá rẻ từ các xưởng Quảng Châu nhập ồ ạt qua biên giới cạnh tranh khốc liệt về giá.', impact: 'high' },
        { id: 't_r2', type: 'threat', content: 'Chính sách phí sàn TMĐT (phí hoa hồng, phí dịch vụ) liên tục tăng qua các năm.', impact: 'high' },
        { id: 't_r3', type: 'threat', content: 'Rủi ro bom hàng, hoàn tiền ảo và vi phạm bản quyền hình ảnh thiết kế.', impact: 'medium' }
      ],
      towsStrategies: [
        {
          id: 'tows_r1',
          type: 'SO',
          title: 'Chiến lược SO: Lịch phát Livestream cố định & BST Độc Quyền Theo Mùa',
          description: 'Sử dụng tốc độ ra mẫu nhanh để sản xuất các phiên bản giới hạn (Limited Drop) chỉ bán trong các phiên Mega Live trên TikTok Shop.',
          relatedItems: ['Tốc độ ra BST nhanh', 'Shoppertainment tăng bùng nổ']
        },
        {
          id: 'tows_r2',
          type: 'WO',
          title: 'Chiến lược WO: Nâng cấp phần mềm quản lý kho tập trung O2O',
          description: 'Ứng dụng phần mềm đồng bộ tồn kho thời gian thực giữa kho tổng, 2 showroom và các gian hàng sàn TMĐT để triệt tiêu tình trạng lệch kho.',
          relatedItems: ['Lệch tồn kho đa kênh', 'Tối ưu hóa bán lẻ']
        },
        {
          id: 'tows_r3',
          type: 'ST',
          title: 'Chiến lược ST: Khẳng định chất liệu cao cấp qua Video minh bạch quy trình',
          description: 'Làm nội dung video ngắn khoe cận cảnh chất vải, đường kim mũi chỉ để phân biệt đẳng cấp với hàng xưởng may nhái giá rẻ.',
          relatedItems: ['Chất liệu cao cấp form đẹp', 'Cạnh tranh hàng giá rẻ']
        },
        {
          id: 'tows_r4',
          type: 'WT',
          title: 'Chiến lược WT: Phát triển mạnh kênh Website & Zalo để tránh phí sàn',
          description: 'Kéo khách hàng quen thuộc về mua trực tiếp trên Website thương hiệu và Zalo Mini App để tiết kiệm 12-15% phí sàn TMĐT.',
          relatedItems: ['Phí sàn ngày càng tăng', 'Phụ thuộc vào ads']
        }
      ],

      // Step 3
      marketing4P: {
        product: {
          strategyDescription: 'Dòng sản phẩm: Áo sơ mi & Đầm công sở thanh lịch (Sản phẩm chủ lực), Áo thun & Quần suông basic (Sản phẩm phễu), Đầm dạ hội cao cấp & Áo khoác Blazer may đo (Sản phẩm giá trị cao).',
          items: [
            { id: 'pr_1', name: 'Áo Sơ Mi Lụa Chống Nhăn LuxeSilk', type: 'core_offer', usp: 'Chất liệu lụa dệt công nghệ mới, thoáng mát không cần ủi', targetCustomer: 'Nữ văn phòng 24-38 tuổi', targetSharePercent: 40 },
            { id: 'pr_2', name: 'Áo Thun Cotton Organic Basic', type: 'lead_magnet', usp: 'Mềm mịn, thấm hút mồ hôi, giá dùng thử cực tốt', targetCustomer: 'Khách hàng mới trải nghiệm lần đầu', targetSharePercent: 20 },
            { id: 'pr_3', name: 'Đầm Tiệc Sang Trọng & Blazer Signature', type: 'high_ticket', usp: 'May đo thủ công tôn dáng chuẩn, đính kết tinh xảo', targetCustomer: 'Quản lý, nữ doanh nhân, khách hàng VIP', targetSharePercent: 30 },
            { id: 'pr_4', name: 'Phụ kiện Khăn lụa & Túi xách', type: 'core_offer', usp: 'Thiết kế đồng bộ theo từng bộ sưu tập', targetCustomer: 'Khách hàng mua kèm phụ kiện', targetSharePercent: 10 }
          ],
          rdInitiatives: 'Ra mắt 4 BST theo 4 mùa trong năm. Ứng dụng bảng kích thước chuẩn hóa 3D cho vóc dáng phụ nữ Việt để giảm tối đa tỷ lệ đổi size.'
        },
        price: {
          strategyType: 'value_based',
          strategyDescription: 'Định vị giá phân khúc Trung-Cao (450.000đ - 1.850.000đ). Giá trị giỏ hàng trung bình AOV mục tiêu 850.000đ.',
          targetGrossMargin: 60,
          discountPolicy: 'Không xả hàng giá sốc làm mất hình ảnh. Áp dụng ưu đãi Voucher theo bậc thang (Mua 2 giảm 10%, Mua 3 tặng khăn lụa), miễn phí vận chuyển cho đơn từ 699.000đ.'
        },
        place: {
          strategyDescription: 'Mô hình Omnichannel tích hợp: Sàn TMĐT (TikTok Shop, Shopee Mall) chiếm 50%, Website thương hiệu chiếm 20%, Hệ thống Showroom (2 cửa hàng) chiếm 30%.',
          channels: [
            { id: 'cr_1', name: 'TikTok Shop & Livestream Mall', type: 'ecommerce', revenueShare: 32, conversionRate: 4.8, focusQuarter: 'Q1-Q4' },
            { id: 'cr_2', name: 'Shopee Mall (LuxeWear Official)', type: 'ecommerce', revenueShare: 28, conversionRate: 5.2, focusQuarter: 'Q1-Q4' },
            { id: 'cr_3', name: 'Hệ thống Showroom (Hà Nội & TP.HCM)', type: 'retail', revenueShare: 25, conversionRate: 42, focusQuarter: 'Q2-Q4' },
            { id: 'cr_4', name: 'Website D2C & Đặt qua Fanpage/Zalo', type: 'direct', revenueShare: 15, conversionRate: 6.5, focusQuarter: 'Q1-Q4' }
          ],
          logisticsNote: 'Kho tổng tại Bình Thạnh (TP.HCM) và kho phụ tại Long Biên (Hà Nội) liên kết đơn vị vận chuyển Viettel Post và GHTK, giao hỏa tốc 2h trong nội thành.'
        },
        promotion: {
          keyMessage: '"Tự Tin Khẳng Định Phong Thái Quý Cô Hiện Đại"',
          mainChannels: ['TikTok Livestream & Video Mẹo Phối Đồ', 'Hợp tác 50 KOC/Influencer Thời trang', 'Quảng cáo Meta Retargeting', 'Bản tin Zalo ZNS cho khách hàng cũ'],
          annualBudget: 3500000000,
          campaigns: [
            { id: 'cmpr_1', name: 'Chiến dịch Tết: "Du Xuân Khởi Sắc - Đón Lộc Đầu Năm"', quarter: 'Q1', channel: 'TikTok & Meta Ads', budget: 900000000, expectedLeads: 25000, targetCAC: 65000 },
            { id: 'cmpr_2', name: 'BST Mùa Hè "Sắc Nắng Thanh Lịch" & Khai Trương Flagship', quarter: 'Q2', channel: 'Event & Fashion Influencers', budget: 950000000, expectedLeads: 28000, targetCAC: 60000 },
            { id: 'cmpr_3', name: 'Chiến dịch Thu-Đông & Chuỗi Siêu Sale 9.9 - 10.10', quarter: 'Q3', channel: 'Livestream Marathon & Sàn TMĐT', budget: 800000000, expectedLeads: 22000, targetCAC: 58000 },
            { id: 'cmpr_4', name: 'Mùa Lễ Hội Cuối Năm & Black Friday / 11.11 / 12.12', quarter: 'Q4', channel: 'Multi-platform Mega Campaign', budget: 850000000, expectedLeads: 30000, targetCAC: 55000 }
          ]
        }
      },

      // Step 4
      actionItems: [
        { id: 'actr_1', title: 'Hoàn thiện nâng cấp phòng Livestream chuyên nghiệp tại kho tổng', quarter: 'Q1', department: 'Marketing', pic: 'Trang - Livestream Lead', deadline: '20/01/2026', priority: 'high', status: 'completed', estimatedBudget: 120000000, expectedResult: '3 phòng live vận hành liên tục 12 tiếng/ngày' },
        { id: 'actr_2', title: 'Triển khai phần mềm quản lý kho đa kênh kết nối API Shopee/TikTok', quarter: 'Q1', department: 'Vận hành', pic: 'Vinh - Ops Manager', deadline: '28/02/2026', priority: 'high', status: 'completed', estimatedBudget: 95000000, expectedResult: 'Đồng bộ tồn kho tự động trong 5 giây, không còn hủy đơn do thiếu hàng' },
        { id: 'actr_3', title: 'Thuê mặt bằng và thiết kế Showroom Flagship tại Quận 3, TP.HCM', quarter: 'Q2', department: 'BOD', pic: 'Mai Anh - Founder', deadline: '15/04/2026', priority: 'high', status: 'in_progress', estimatedBudget: 600000000, expectedResult: 'Vị trí đắc địa mặt tiền 8m, hợp đồng 5 năm' },
        { id: 'actr_4', title: 'Tổ chức sự kiện ra mắt BST Mùa Hè và khai trương Flagship Store', quarter: 'Q2', department: 'Marketing', pic: 'Hoàng - Brand Manager', deadline: '20/05/2026', priority: 'high', status: 'in_progress', estimatedBudget: 250000000, expectedResult: 'Hơn 40 nghệ sĩ và KOL tham dự, phủ sóng báo chí và mạng xã hội' },
        { id: 'actr_5', title: 'Mở rộng đội ngũ thiết kế và kỹ thuật rập may mẫu lên 12 nhân sự', quarter: 'Q3', department: 'Nhân sự', pic: 'Ngọc - HR Lead', deadline: '31/07/2026', priority: 'medium', status: 'pending', estimatedBudget: 150000000, expectedResult: 'Rút ngắn chu kỳ ra mẫu xuống còn 7 ngày' },
        { id: 'actr_6', title: 'Đàm phán hạn mức tín dụng tài trợ vốn lưu động mùa cao điểm với ngân hàng', quarter: 'Q3', department: 'Tài chính', pic: 'Hùng - CFO', deadline: '30/08/2026', priority: 'high', status: 'pending', estimatedBudget: 50000000, expectedResult: 'Hạn mức vay ưu đãi lãi suất thấp 10 tỷ VNĐ nhập vải trữ kho' },
        { id: 'actr_7', title: 'Chiến dịch Livestream Marathon 72h cho Lễ hội Mua sắm 11.11 & 12.12', quarter: 'Q4', department: 'Kinh doanh', pic: 'Trang - Livestream Lead', deadline: '15/12/2026', priority: 'high', status: 'pending', estimatedBudget: 400000000, expectedResult: 'Doanh số 2 đợt siêu sale đạt 8,5 tỷ VNĐ' }
      ],

      // Step 5
      financials: {
        currency: 'VND',
        unitMultiplier: 1,
        quarters: {
          Q1: {
            revenue: 6800000000,
            cogs: 2720000000, // 40%
            opexSalaries: 1100000000,
            opexRent: 420000000,
            opexMarketing: 900000000, // Chi phí chạy ads và KOC
            opexAdmin: 220000000,
            opexContingency: 120000000
          },
          Q2: {
            revenue: 7800000000,
            cogs: 3042000000, // 39%
            opexSalaries: 1250000000,
            opexRent: 580000000, // thêm Flagship Store
            opexMarketing: 950000000,
            opexAdmin: 250000000,
            opexContingency: 140000000
          },
          Q3: {
            revenue: 8200000000,
            cogs: 3198000000, // 39%
            opexSalaries: 1320000000,
            opexRent: 580000000,
            opexMarketing: 800000000,
            opexAdmin: 260000000,
            opexContingency: 150000000
          },
          Q4: {
            revenue: 9200000000,
            cogs: 3588000000, // 39%
            opexSalaries: 1550000000, // Thưởng và lương tăng ca
            opexRent: 600000000,
            opexMarketing: 850000000,
            opexAdmin: 290000000,
            opexContingency: 180000000
          }
        },
        sensitivity: {
          revenueGrowthRate: 0,
          cogsRateAdjustment: 0,
          marketingBudgetBoost: 0
        }
      }
    }
  },
  {
    id: 'agency',
    title: 'Agency Truyền thông & Tư vấn Tăng trưởng',
    industryName: 'Dịch vụ Tư vấn & Marketing',
    tagline: 'Agency chuyên sâu về Performance Marketing và Xây dựng Thương hiệu Doanh nghiệp',
    description: 'Kế hoạch kinh doanh cho công ty dịch vụ tiếp thị số & sáng tạo, tập trung vào hợp đồng Retainer định kỳ dài hạn, dịch vụ chuyển đổi số và nâng cao tỷ suất lợi nhuận trên mỗi chuyên gia.',
    data: {
      id: 'agency_plan_2026',
      lastUpdated: new Date().toISOString(),
      companyName: 'Công ty Cổ phần Alpha Growth Agency',
      industry: 'Dịch vụ Truyền thông & Tư vấn Chiến lược',
      planningYear: 2026,
      author: 'Nguyễn Thành Nam - Managing Partner',
      
      // Step 1
      vision: 'Trở thành đơn vị tư vấn tăng trưởng doanh số và xây dựng thương hiệu được tin cậy nhất cho các doanh nghiệp SME và tập đoàn đang vươn mình tại Việt Nam.',
      mission: 'Đồng hành cùng khách hàng tạo ra tăng trưởng thực chất, đo lường được bằng doanh thu và giá trị thương hiệu bền vững.',
      coreValues: [
        'Hiệu quả đo lường được (Data-driven)',
        'Minh bạch trong từng cam kết',
        'Sáng tạo đột phá',
        'Tư duy hợp tác cùng thắng (Win-Win)'
      ],
      strategicSummary: 'Chuyển đổi 60% hợp đồng từ dự án nhỏ lẻ sang mô hình Phí duy trì hàng tháng (Monthly Retainer) từ 6-12 tháng, đạt doanh thu 16,8 tỷ VNĐ với biên lợi nhuận ròng 23%.',
      annualTargetRevenue: 16800000000,
      annualTargetNetProfitMargin: 23.5,
      targetNewCustomers: 45,
      targetCustomerRetention: 85,
      smartGoals: [
        {
          id: 'sg_a1',
          category: 'Doanh thu',
          title: 'Tổng doanh thu dịch vụ đạt 16,8 tỷ VNĐ (+45% YoY)',
          targetValue: 16800000000,
          currentValue: 11500000000,
          unit: 'VNĐ',
          deadline: '31/12/2026',
          owner: 'Managing Partner'
        },
        {
          id: 'sg_a2',
          category: 'Khách hàng',
          title: 'Duy trì 28 khách hàng Retainer thường xuyên với mức phí tối thiểu 45 triệu/tháng',
          targetValue: 28,
          currentValue: 15,
          unit: 'Hợp đồng Retainer',
          deadline: '30/11/2026',
          owner: 'Account Director'
        },
        {
          id: 'sg_a3',
          category: 'Vận hành',
          title: 'Nâng tỷ lệ nhân sự làm việc hiệu quả (Billable Hours) lên 78%',
          targetValue: 78,
          currentValue: 62,
          unit: '%',
          deadline: '30/06/2026',
          owner: 'Operations Manager'
        },
        {
          id: 'sg_a4',
          category: 'Nhân sự',
          title: 'Đào tạo 100% Account và Strategist có chứng chỉ Google & Meta Partner Expert',
          targetValue: 100,
          currentValue: 40,
          unit: '% nhân sự',
          deadline: '30/09/2026',
          owner: 'Head of Media'
        }
      ],

      // Step 2
      swotItems: [
        { id: 's_a1', type: 'strength', content: 'Đội ngũ chuyên gia có kinh nghiệm chạy chiến dịch cho các tập đoàn FMCG và Bất động sản lớn.', impact: 'high' },
        { id: 's_a2', type: 'strength', content: 'Case study thực chiến với số liệu tăng trưởng rõ ràng (tăng ROAS từ 2.5 lên 5.2x cho nhiều nhãn hàng).', impact: 'high' },
        { id: 's_a3', type: 'strength', content: 'Khả năng sáng tạo nội dung viral video và livestream chuyên nghiệp.', impact: 'medium' },
        { id: 'w_a1', type: 'weakness', content: 'Chất lượng dịch vụ phụ thuộc vào một số nhân sự chủ chốt (Key Persons), dễ bị biến động khi nhân sự nghỉ.', impact: 'high' },
        { id: 'w_a2', type: 'weakness', content: 'Quy trình bàn giao dự án và lưu trữ tài nguyên thiết kế chưa được đóng gói bài bản.', impact: 'medium' },
        { id: 'w_a3', type: 'weakness', content: 'Thời gian thu hồi công nợ từ khách hàng doanh nghiệp đôi khi kéo dài 45-60 ngày.', impact: 'high' },
        { id: 'o_a1', type: 'opportunity', content: 'Hàng ngàn doanh nghiệp SME đang cần tái định vị thương hiệu và chuyển đổi số tiếp thị bài bản.', impact: 'high' },
        { id: 'o_a2', type: 'opportunity', content: 'Các nền tảng mới (TikTok Shop, Zalo Video) đòi hỏi chuyên môn kỹ thuật mà doanh nghiệp tự làm không nổi.', impact: 'high' },
        { id: 'o_a3', type: 'opportunity', content: 'Cơ hội cung cấp dịch vụ trọn gói Performance Marketing gắn liền với % hoa hồng doanh thu thực tế.', impact: 'medium' },
        { id: 't_a1', type: 'threat', content: 'Rất nhiều freelancer và agency nhỏ chào giá phá giá dịch vụ.', impact: 'high' },
        { id: 't_a2', type: 'threat', content: 'Chính sách siết chặt quảng cáo và quét tài khoản của các nền tảng (Facebook, Google).', impact: 'medium' },
        { id: 't_a3', type: 'threat', content: 'Khách hàng cắt giảm ngân sách tiếp thị khi thị trường kinh doanh chậm lại.', impact: 'high' }
      ],
      towsStrategies: [
        {
          id: 'tows_a1',
          type: 'SO',
          title: 'Chiến lược SO: Đóng gói dịch vụ Retainer Tăng Trưởng Toàn Diện',
          description: 'Sử dụng case study ấn tượng để ký các hợp đồng Retainer cam kết KPI doanh thu cho các chủ doanh nghiệp SME vừa và lớn.',
          relatedItems: ['Case study thực chiến', 'SME cần chuyển đổi số']
        },
        {
          id: 'tows_a2',
          type: 'WO',
          title: 'Chiến lược WO: Chuẩn hóa bộ SOP thực thi và xây dựng Agency Wiki',
          description: 'Đóng gói quy trình lên kế hoạch truyền thông và checklist kiểm soát chất lượng giúp nhân sự mới có thể tiếp quản trơn tru, giảm phụ thuộc vào cá nhân.',
          relatedItems: ['Phụ thuộc nhân sự chủ chốt', 'Quy trình chưa bài bản']
        },
        {
          id: 'tows_a3',
          type: 'ST',
          title: 'Chiến lược ST: Định vị Agency cấp chiến lược, nói không với phá giá',
          description: 'Tập trung vào phân khúc khách hàng coi trọng chất lượng và bảo chứng doanh số thực, từ chối các dự án giá rẻ rủi ro cao.',
          relatedItems: ['Kinh nghiệm tập đoàn lớn', 'Agency nhỏ phá giá']
        },
        {
          id: 'tows_a4',
          type: 'WT',
          title: 'Chiến lược WT: Siết chặt hợp đồng thu phí trước theo từng tháng (Milestone)',
          description: 'Yêu cầu thanh toán phí quản lý dịch vụ vào đầu mỗi tháng hoặc đặt cọc 50% trước khi triển khai để tránh nợ đọng.',
          relatedItems: ['Thu hồi công nợ chậm', 'Khách hàng cắt ngân sách']
        }
      ],

      // Step 3
      marketing4P: {
        product: {
          strategyDescription: 'Các gói dịch vụ: Gói Khám sức khỏe Thương hiệu & Audit Digital (Phễu), Gói Quản trị Tiếp thị Trọn gói Retainer (Chủ lực), Gói Tư vấn Chiến lược Tăng trưởng & Đào tạo In-house (Cao cấp).',
          items: [
            { id: 'pa_1', name: 'Gói Audit & Khám Kênh Tiếp Thị Doanh Nghiệp', type: 'lead_magnet', usp: 'Báo cáo 45 trang chỉ ra toàn bộ điểm nghẽn quảng cáo và đề xuất giải pháp cụ thể', targetCustomer: 'Chủ doanh nghiệp chưa hài lòng với đội ngũ MKT hiện tại', targetSharePercent: 15 },
            { id: 'pa_2', name: 'Dịch vụ Quản trị Tăng trưởng Retainer Toàn Diện', type: 'core_offer', usp: 'Quản lý toàn bộ kênh Meta, Google, TikTok kèm cam kết Lead chất lượng', targetCustomer: 'Doanh nghiệp SME doanh số 20-200 tỷ/năm', targetSharePercent: 65 },
            { id: 'pa_3', name: 'Gói Tư vấn Tái định vị & Nhận diện Thương hiệu', type: 'high_ticket', usp: 'Được trực tiếp Managing Partner & Creative Director cố vấn', targetCustomer: 'Tập đoàn & Doanh nghiệp chuẩn bị mở rộng chuỗi hoặc IPO', targetSharePercent: 20 }
          ],
          rdInitiatives: 'Xây dựng bảng Dashboard báo cáo tự động tích hợp Looker Studio & AI giúp khách hàng xem số liệu doanh thu và chi phí quảng cáo trực tiếp 24/7.'
        },
        price: {
          strategyType: 'value_based',
          strategyDescription: 'Mô hình Base Fee (Phí cố định hàng tháng từ 35 - 90 triệu) + Performance Bonus (Thưởng 3-5% trên phần doanh thu vượt KPI).',
          targetGrossMargin: 72,
          discountPolicy: 'Cam kết ký hợp đồng 12 tháng được tặng 1 gói sản xuất 5 video TikTok chuyên nghiệp trị giá 30 triệu.'
        },
        place: {
          strategyDescription: 'Tư vấn trực tiếp tại văn phòng khách hàng kết hợp làm việc từ xa qua Slack, Trello và Google Meet.',
          channels: [
            { id: 'ca_1', name: 'Kênh Quan hệ Đối tác & Giới thiệu (Word-of-Mouth)', type: 'direct', revenueShare: 50, conversionRate: 45, focusQuarter: 'Q1-Q4' },
            { id: 'ca_2', name: 'Website AlphaGrowth, Case Study & SEO B2B', type: 'direct', revenueShare: 30, conversionRate: 15, focusQuarter: 'Q1-Q4' },
            { id: 'ca_3', name: 'Hội thảo Doanh nhân & Tổ chức BNI / YBA', type: 'partner', revenueShare: 20, conversionRate: 25, focusQuarter: 'Q2-Q4' }
          ],
          logisticsNote: 'Văn phòng chính tại Quận 1, TP.HCM và chi nhánh đại diện tại Đống Đa, Hà Nội.'
        },
        promotion: {
          keyMessage: '"Chiến Lược Sắc Bén - Tăng Trưởng Đột Phá - Doanh Số Thực Tế"',
          mainChannels: ['Xuất bản Báo cáo Nghiên cứu Ngành (Industry Whitepaper)', 'Bài viết Chuyên sâu trên LinkedIn & Facebook Fanpage', 'Chia sẻ Case Study Thực Chiến', 'Khóa học Masterclass dành cho Lãnh đạo'],
          annualBudget: 950000000,
          campaigns: [
            { id: 'cmpa_1', name: 'Phát hành Sách trắng: "Bản Đồ Tiếp Thị Số 2026 cho Doanh Nghiệp SME"', quarter: 'Q1', channel: 'LinkedIn & PR Báo chí', budget: 220000000, expectedLeads: 800, targetCAC: 275000 },
            { id: 'cmpa_2', name: 'Masterclass: "Tối Ưu Ngân Sách Tiếp Thị & Nhân Bản Đơn Hàng"', quarter: 'Q2', channel: 'Sự kiện Khách sạn 5 sao', budget: 280000000, expectedLeads: 120, targetCAC: 2300000 },
            { id: 'cmpa_3', name: 'Chuỗi Video Podcast trò chuyện cùng các CEO thành công', quarter: 'Q3', channel: 'YouTube & Spotify', budget: 250000000, expectedLeads: 450, targetCAC: 550000 },
            { id: 'cmpa_4', name: 'Chương trình Tư vấn Lập Kế hoạch Tiếp Thị 2027 cho Khách Hàng', quarter: 'Q4', channel: 'Direct Outreach & Email MKT', budget: 200000000, expectedLeads: 200, targetCAC: 1000000 }
          ]
        }
      },

      // Step 4
      actionItems: [
        { id: 'acta_1', title: 'Hoàn thiện đóng gói bộ Báo cáo Nghiên cứu Ngành 2026 và phát hành', quarter: 'Q1', department: 'Marketing', pic: 'Minh - Content Lead', deadline: '25/02/2026', priority: 'high', status: 'completed', estimatedBudget: 65000000, expectedResult: '1.200 lượt tải về và 45 yêu cầu tư vấn trực tiếp' },
        { id: 'acta_2', title: 'Tuyển dụng 2 Senior Account Manager & 1 Creative Strategist', quarter: 'Q1', department: 'Nhân sự', pic: 'Linh - HR Lead', deadline: '20/03/2026', priority: 'high', status: 'completed', estimatedBudget: 50000000, expectedResult: 'Hoàn thiện bộ khung quản lý dự án cho 30 khách hàng đồng thời' },
        { id: 'acta_3', title: 'Tổ chức thành công Masterclass tại Khách sạn New World Sài Gòn', quarter: 'Q2', department: 'Marketing', pic: 'Nam - Managing Partner', deadline: '15/05/2026', priority: 'high', status: 'in_progress', estimatedBudget: 180000000, expectedResult: 'Ký được 6 hợp đồng Retainer trị giá 2,8 tỷ ngay tại hội thảo' },
        { id: 'acta_4', title: 'Xây dựng cổng Portal Khách hàng xem báo cáo thời gian thực tự động', quarter: 'Q2', department: 'Vận hành', pic: 'Thắng - Tech Lead', deadline: '30/06/2026', priority: 'medium', status: 'in_progress', estimatedBudget: 80000000, expectedResult: 'Giảm 50% thời gian làm báo cáo thủ công mỗi tuần của account' },
        { id: 'acta_5', title: 'Ký thỏa thuận hợp tác đối tác Agency Ưu Tiên với TikTok và Google', quarter: 'Q3', department: 'Kinh doanh', pic: 'Huy - Media Director', deadline: '31/08/2026', priority: 'high', status: 'pending', estimatedBudget: 40000000, expectedResult: 'Nhận được hỗ trợ kỹ thuật cấp cao và chính sách rebate tốt nhất' },
        { id: 'acta_6', title: 'Rà soát và tinh chỉnh cấu trúc hoa hồng hiệu suất cho đội ngũ chuyên gia', quarter: 'Q3', department: 'Tài chính', pic: 'Thảo - Finance Lead', deadline: '30/09/2026', priority: 'medium', status: 'pending', estimatedBudget: 20000000, expectedResult: 'Tạo động lực giữ chân nhân tài xuất sắc' },
        { id: 'acta_7', title: 'Chiến dịch Gia hạn Hợp đồng Retainer Năm 2027 cho các khách hàng VIP', quarter: 'Q4', department: 'Kinh doanh', pic: 'Nam - Managing Partner', deadline: '20/12/2026', priority: 'high', status: 'pending', estimatedBudget: 90000000, expectedResult: 'Tái ký 85% danh mục hợp đồng' }
      ],

      // Step 5
      financials: {
        currency: 'VND',
        unitMultiplier: 1,
        quarters: {
          Q1: {
            revenue: 3500000000,
            cogs: 980000000, // 28% (chi phí đối tác sản xuất media, KOLs, công cụ software)
            opexSalaries: 1350000000, // Chi phí nhân sự chuyên gia chất lượng cao
            opexRent: 220000000,
            opexMarketing: 220000000,
            opexAdmin: 110000000,
            opexContingency: 70000000
          },
          Q2: {
            revenue: 4200000000,
            cogs: 1176000000,
            opexSalaries: 1480000000,
            opexRent: 220000000,
            opexMarketing: 280000000,
            opexAdmin: 120000000,
            opexContingency: 80000000
          },
          Q3: {
            revenue: 4400000000,
            cogs: 1232000000,
            opexSalaries: 1550000000,
            opexRent: 240000000,
            opexMarketing: 250000000,
            opexAdmin: 130000000,
            opexContingency: 90000000
          },
          Q4: {
            revenue: 4700000000,
            cogs: 1316000000,
            opexSalaries: 1700000000, // Thưởng hiệu suất dự án
            opexRent: 240000000,
            opexMarketing: 200000000,
            opexAdmin: 140000000,
            opexContingency: 100000000
          }
        },
        sensitivity: {
          revenueGrowthRate: 0,
          cogsRateAdjustment: 0,
          marketingBudgetBoost: 0
        }
      }
    }
  }
];
