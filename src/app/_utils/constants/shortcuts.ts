import { ShortcutT } from "@/app/_utils/types/shortcuts-type";

const DOMAIN = `naver.com`;

const shortcuts: ShortcutT[] = [
  {
    id: "svc.news-1",
    name: "뉴스",
    description: "언론사 구독과 AI 추천 뉴스",
    icon: "/logo/svc.news-1.png",
    url: `https://news.${DOMAIN}/`,
    category: "뉴스",
    categoryCode: "TODAY"
  },
  {
    id: "svc.weather-1",
    name: "날씨",
    description: "최신 날씨, 미세먼지, 대기영상 정보",
    icon: "/logo/svc.weather-1.png",
    url: `https://weather.${DOMAIN}/`,
    category: "뉴스",
    categoryCode: "TODAY"
  },
  {
    id: "svc.sports-1",
    name: "스포츠",
    description: "스포츠의 시작과 끝, 네이버 스포츠",
    icon: "/logo/svc.sports-1.png",
    url: `https://sports.${DOMAIN}/`,
    category: "뉴스",
    categoryCode: "TODAY"
  },
  {
    id: "svc.enter-1",
    name: "엔터",
    description: "한눈에 보는 엔터 소식",
    icon: "/logo/svc.enter-1.png",
    url: `https://entertain.${DOMAIN}/home`,
    category: "뉴스",
    categoryCode: "TODAY"
  },
  {
    id: "svc.mycar-1",
    name: "MY CAR",
    description: "알아서 알려주는 스마트한 내 차 관리!",
    icon: "/logo/svc.mycar-1.png",
    url: `https://mycar.${DOMAIN}/`,
    category: "금융∙자산",
    categoryCode: "FINANCE"
  },
  {
    id: "svc.npay-1",
    name: "네이버페이",
    description: "편리한 결제, 쓸수록 쌓이는 포인트 ",
    icon: "/logo/svc.npay-1.png",
    url: `https://new-m.pay.${DOMAIN}/mydata/home?from=aside_service`,
    category: "금융∙자산",
    categoryCode: "FINANCE"
  },
  {
    id: "svc.land-1",
    name: "부동산",
    description: "집 찾을 때도, 방 찾을 때도 네이버 부동산",
    icon: "/logo/svc.land-1.png",
    url: `https://fin.land.${DOMAIN}/?content=recent`,
    category: "금융∙자산",
    categoryCode: "FINANCE"
  },
  {
    id: "svc.stock-1",
    name: "증권",
    description: "주식 투자의 좋은 습관, 네이버 증권",
    icon: "/logo/svc.stock-1.png",
    url: `https://stock.${DOMAIN}/`,
    category: "금융∙자산",
    categoryCode: "FINANCE"
  },
  {
    id: "svc.ngame-1",
    name: "네이버게임",
    description: "게임을 더 재미있게! 게이머를 위한 공간",
    icon: "/logo/svc.ngame-1.png",
    url: `https://game.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.tvcastweb-1",
    name: "네이버TV",
    description: "인기 방송부터 핫한 인플루언서 동영상까지!",
    icon: "/logo/svc.tvcastweb-1.png",
    url: `https://tv.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.series-1",
    name: "시리즈",
    description: "매일매일 새로운 이야기, 시리즈",
    icon: "/logo/svc.series-1.png",
    url: `https://series.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.serieson-1",
    name: "시리즈온",
    description: "최신 영화부터 화제의 방송까지",
    icon: "/logo/svc.serieson-1.png",
    url: `https://serieson.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.audioclip-1",
    name: "오디오클립",
    description: "즐거움이 들린다! 오디오클립",
    icon: "/logo/svc.audioclip-1.png",
    url: `https://audioclip.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.novel-1",
    name: "웹소설",
    description: "이야기, 작품이 되다. 웹소설",
    icon: "/logo/svc.novel-1.png",
    url: `https://novel.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.comic-1",
    name: "웹툰",
    description: "글로벌 NO.1 재미의 중심, 네이버웹툰",
    icon: "/logo/svc.comic-1.png",
    url: `https://comic.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.vibe-1",
    name: "VIBE",
    description: "오늘 들을 음악 고민없이, VIBE",
    icon: "/logo/svc.vibe-1.png",
    url: `https://vibe.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.chzzk-1",
    name: "치지직",
    description: "스트리밍이 시작됩니다. 치지직-",
    icon: "/logo/svc.chzzk-1.png",
    url: `https://chzzk.${DOMAIN}/`,
    category: "엔터테인먼트∙문화",
    categoryCode: "ENTER"
  },
  {
    id: "svc.shopping-1",
    name: "스토어",
    description: "깎고 + 받고 + 쌓는 셈이 다른 쇼핑!",
    icon: "/logo/svc.shopping-1.png",
    url: `https://shopping.${DOMAIN}/ns/home`,
    category: "쇼핑",
    categoryCode: "COMMERCE"
  },
  {
    id: "svc.selective-1",
    name: "쇼핑라이브",
    description: "산지에서 해외까지, 생생한 리얼쇼핑",
    icon: "/logo/svc.selective-1.png",
    url: `https://shoppinglive.${DOMAIN}/`,
    category: "쇼핑",
    categoryCode: "COMMERCE"
  },
  {
    id: "svc.gift-1",
    name: "선물샵",
    description: "취향 저격 선물을 찾아드려요",
    icon: "/logo/svc.gift-1.png",
    url: `https://shopping.${DOMAIN}/gift/home`,
    category: "쇼핑",
    categoryCode: "COMMERCE"
  },
  {
    id: "svc.market-1",
    name: "지금배달",
    description: "주변 1시간 내외 즉시배송 발품없는 현명한 쇼핑",
    icon: "/logo/svc.market-1.png",
    url: `https://shopping.${DOMAIN}/market/home`,
    category: "쇼핑",
    categoryCode: "COMMERCE"
  },
  {
    id: "svc.fashiontown-1",
    name: "패션타운",
    description: "백화점부터 아울렛, 소호까지 한 번에!",
    icon: "/logo/svc.fashiontown-1.png",
    url: `https://shopping.${DOMAIN}/window/main/fashion-group`,
    category: "쇼핑",
    categoryCode: "COMMERCE"
  },
  {
    id: "svc.nflea-1",
    name: "N플리마켓",
    description: "안전하고 쉬운 중고거래, 네이버 플리마켓",
    icon: "/logo/svc.nflea-1.png",
    url: `https://fleamarket.${DOMAIN}/`,
    category: "쇼핑",
    categoryCode: "COMMERCE"
  },
  {
    id: "svc.membership-1",
    name: "멤버십",
    description: "최대 5% 강력한 적립부터 콘텐츠 혜택까지",
    icon: "/logo/svc.membership-1.png",
    url: `https://nid.${DOMAIN}/membership/join?redirect=my`,
    category: "멤버십",
    categoryCode: "MEMBERSHIP"
  },
  {
    id: "svc.membershipstudent-1",
    name: "멤버십스튜던트",
    description: "대학 생활을 위한 필수 멤버십",
    icon: "/logo/svc.membershipstudent-1.png",
    url: `https://nid.${DOMAIN}/membership/join?m=joinStudent&redirect=my`,
    category: "멤버십",
    categoryCode: "MEMBERSHIP"
  },
  {
    id: "svc.keep-1",
    name: "Keep",
    description: "북마크한 링크와 파일, keep에서 확인!",
    icon: "/logo/svc.keep-1.png",
    url: `https://keep.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.ndrive-1",
    name: "MYBOX",
    description: "국내 최대 무료 30GB 스마트한 파일 저장",
    icon: "/logo/svc.ndrive-1.png",
    url: `https://mybox.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.memo-1",
    name: "메모",
    description: "가장 간편한 기록, 네이버 메모",
    icon: "/logo/svc.memo-1.png",
    url: `https://memo.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.mail-1",
    name: "메일",
    description: "새로운 소식과 정보를 매일, 메일!",
    icon: "/logo/svc.mail-1.png",
    url: `https://mail.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.contact-1",
    name: "주소록",
    description: "소중한 연락처를 안전하게",
    icon: "/logo/svc.contact-1.png",
    url: `https://contact.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.calendar-1",
    name: "캘린더",
    description: "일상을 계획하는 즐거움",
    icon: "/logo/svc.calendar-1.png",
    url: `https://calendar.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.talktalk-1",
    name: "톡톡",
    description: "빠르고 쉬운 채팅상담, 네이버 톡톡",
    icon: "/logo/svc.talktalk-1.png",
    url: `https://talk.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.form-1",
    name: "네이버 폼",
    description: "설문조사 고민 끝! 어디에서나 편리하게!",
    icon: "/logo/svc.form-1.png",
    url: `https://form.${DOMAIN}/`,
    category: "내도구",
    categoryCode: "MY"
  },
  {
    id: "svc.invoice-1",
    name: "인증서",
    description: "한번 발급으로 3년 동안 편하고 안전하게",
    icon: "/logo/svc.invoice-1.png",
    url: `https://nid.${DOMAIN}/user2/eSign/v1/home/land`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.naverpass-1",
    name: "출입증",
    description: "네이버의 간편한 오프라인 신원 인증 도구",
    icon: "/logo/svc.naverpass-1.png",
    url: `https://nid.${DOMAIN}/naverpass/bridge`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.license-1",
    name: "자격증",
    description: "내 자격증을 한 곳에, 네이버 자격증",
    icon: "/logo/svc.license-1.png",
    url: `https://license.nid.${DOMAIN}/user2/help/license`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.signtax-1",
    name: "전자문서",
    description: "생활이 더욱 편리해지는 모바일 고지·안내문",
    icon: "/logo/svc.signtax-1.png",
    url: `https://invoice.${DOMAIN}/main`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.certificate-1",
    name: "전자증명서",
    description: "전자증명서에서 주민등록등본 발급",
    icon: "/logo/svc.certificate-1.png",
    url: `https://certificate.nid.${DOMAIN}/main`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.idcard-1",
    name: "학생동문증",
    description: "간편한 우리 학교 인증",
    icon: "/logo/svc.idcard-1.png",
    url: `https://idcard.nid.${DOMAIN}/main`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.collection-1",
    name: "컬렉션",
    description: "디지털 보증서를 발송/보관하는 서비스",
    icon: "/logo/svc.collection-1.png",
    url: `https://buyer.collection.${DOMAIN}/home/main`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.books-1",
    name: "책이음",
    description: "책이음 도서관 이용, 네이버앱으로 간편하게",
    icon: "/logo/svc.books-1.png",
    url: `https://books.nid.${DOMAIN}/`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.didcard-1",
    name: "신분증",
    description: "주민등록증ㆍ운전면허증을 네이버앱에서",
    icon: "/logo/svc.didcard-1.png",
    url: `https://didcard.${DOMAIN}/home/main`,
    category: "인증",
    categoryCode: "CERTIFICATION"
  },
  {
    id: "svc.band-1",
    name: "밴드",
    description: "모임이 쉬워진다, 네이버 밴드",
    icon: "/logo/svc.band-1.png",
    url: `https://www.band.us/`,
    category: "커뮤니티∙콘텐츠",
    categoryCode: "DISCOVER"
  },
  {
    id: "svc.blog-1",
    name: "블로그",
    description: "기록의 발견, 즐거운 연결. 네이버 블로그",
    icon: "/logo/svc.blog-1.png",
    url: `https://blog.${DOMAIN}/`,
    category: "커뮤니티∙콘텐츠",
    categoryCode: "DISCOVER"
  },
  {
    id: "svc.bboom-1",
    name: "뿜",
    description: "유머로 소통하는 모두의 놀이터",
    icon: "/logo/svc.bboom-1.png",
    url: `https://bboom.${DOMAIN}/`,
    category: "커뮤니티∙콘텐츠",
    categoryCode: "DISCOVER"
  },
  {
    id: "svc.Influencer-1",
    name: "인플루언서",
    description: "관심 분야의 전문 창작자를 만나는 곳",
    icon: "/logo/svc.Influencer-1.png",
    url: `https://in.${DOMAIN}/discover`,
    category: "커뮤니티∙콘텐츠",
    categoryCode: "DISCOVER"
  },
  {
    id: "svc.cafe-1",
    name: "카페",
    description: "대한민국 No.1 커뮤니티, 네이버 카페",
    icon: "/logo/svc.cafe-1.png",
    url: `https://cafe.${DOMAIN}/`,
    category: "커뮤니티∙콘텐츠",
    categoryCode: "DISCOVER"
  },
  {
    id: "svc.preminumc-1",
    name: "프리미엄콘텐츠",
    description: "가치 있는 콘텐츠의 성공! 프리미엄콘텐츠",
    icon: "/logo/svc.preminumc-1.png",
    url: `https://contents.premium.${DOMAIN}/`,
    category: "커뮤니티∙콘텐츠",
    categoryCode: "DISCOVER"
  },
  {
    id: "svc.booking-1",
    name: "네이버예약",
    description: "줄 서지 않는 편리한 생활의 시작",
    icon: "/logo/svc.booking-1.png",
    url: `https://booking.${DOMAIN}/booked/list`,
    category: "지도∙여행",
    categoryCode: "PLACE"
  },
  {
    id: "svc.map-1",
    name: "지도",
    description: "공간을 검색합니다. 생활을 연결합니다.",
    icon: "/logo/svc.map-1.png",
    url: `https://map.${DOMAIN}/`,
    category: "지도∙여행",
    categoryCode: "PLACE"
  },
  {
    id: "svc.flights-1",
    name: "항공권",
    description: "전세계 항공편 실시간 가격비교",
    icon: "/logo/svc.flights-1.png",
    url: `https://flight.${DOMAIN}/`,
    category: "지도∙여행",
    categoryCode: "PLACE"
  },
  {
    id: "svc.hotels-1",
    name: "호텔",
    description: "호텔 예약 사이트 가격을 한 번에",
    icon: "/logo/svc.hotels-1.png",
    url: `https://hotels.${DOMAIN}/`,
    category: "지도∙여행",
    categoryCode: "PLACE"
  },
  {
    id: "svc.myplace-1",
    name: "MY플레이스",
    description: "장소로 만드는 나만의 콘텐츠",
    icon: "/logo/svc.myplace-1.png",
    url: `https://place.${DOMAIN}/my/`,
    category: "지도∙여행",
    categoryCode: "PLACE"
  },
  {
    id: "svc.dic-1",
    name: "사전",
    description: "43종 언어 사전과 다양한 어학 콘텐츠",
    icon: "/logo/svc.dic-1.png",
    url: `https://dict.${DOMAIN}/`,
    category: "사전∙지식",
    categoryCode: "STUDY"
  },
  {
    id: "svc.expert-1",
    name: "엑스퍼트",
    description: "언제 어디서나 전문가와 실시간 상담",
    icon: "/logo/svc.expert-1.png",
    url: `https://kin.${DOMAIN}/mobile/expert/home`,
    category: "사전∙지식",
    categoryCode: "STUDY"
  },
  {
    id: "svc.terms-1",
    name: "지식백과",
    description: "지식 공유 플랫폼 네이버 지식백과",
    icon: "/logo/svc.terms-1.png",
    url: `https://terms.${DOMAIN}/`,
    category: "사전∙지식",
    categoryCode: "STUDY"
  },
  {
    id: "svc.kin-1",
    name: "지식iN",
    description: "세상의 모든 Q&A",
    icon: "/logo/svc.kin-1.png",
    url: `https://kin.${DOMAIN}/`,
    category: "사전∙지식",
    categoryCode: "STUDY"
  },
  {
    id: "svc.boostcourse-1",
    name: "부스트코스",
    description: "함께 배우는 일상 속의 AI",
    icon: "/logo/svc.boostcourse-1.png",
    url: `https://boostcourse.org/`,
    category: "사전∙지식",
    categoryCode: "STUDY"
  },
  {
    id: "svc.inflcenter-1",
    name: "인플루언서센터",
    description: "인플루언서만을 위한 성장,지원 프로그램",
    icon: "/logo/svc.inflcenter-1.png",
    url: `https://influencercenter.${DOMAIN}/my`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "창작자 지원"
  },
  {
    id: "svc.advisor-1",
    name: "크리에이터어드바이저",
    description: "스마트한 창작활동을 위한 데이터 분석",
    icon: "/logo/svc.advisor-1.png",
    url: `https://creator-advisor.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "창작자 지원"
  },
  {
    id: "svc.expertcenter-1",
    name: "엑스퍼트 센터",
    description: "전문가와 1:1 상담할 수 있는 유료 지식 거래 플랫폼",
    icon: "/logo/svc.expertcenter-1.png",
    url: `https://kin.${DOMAIN}/mobile/expert/account/join/hub`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "창작자 지원"
  },
  {
    id: "svc.smartstore-1",
    name: "스마트스토어센터",
    description: "누구나 쉽게 만드는 온라인 쇼핑몰",
    icon: "/logo/svc.smartstore-1.png",
    url: `https://sell.smartstore.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "소상공인 지원"
  },
  {
    id: "svc.mnmb-1",
    name: "스마트 플레이스",
    description: "내 가게가 네이버에 나오는 방법",
    icon: "/logo/svc.mnmb-1.png",
    url: `https://smartplace.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "소상공인 지원"
  },
  {
    id: "svc.talkptncenter-1",
    name: "톡톡 파트너센터",
    description: "쉽고 간편하게 고객과 대화하는 방법",
    icon: "/logo/svc.talkptncenter-1.png",
    url: `https://partner.talk.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "소상공인 지원"
  },
  {
    id: "svc.partners-1",
    name: "네이버 비즈니스 스쿨",
    description: "사업자와 창작자를 위한 열린 공간",
    icon: "/logo/svc.partners-1.png",
    url: `https://bizschool.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "소상공인 지원"
  },
  {
    id: "svc.finsupport-1",
    name: "네이버 비즈니스 금융센터",
    description: "사업자에게 필요한 금융정보를 한 곳에서",
    icon: "/logo/svc.finsupport-1.png",
    url: `https://finsupport.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "소상공인 지원"
  },
  {
    id: "svc.nilogin-1",
    name: "네이버 로그인",
    description: "네이버 회원 모두를 여러분의 회원으로",
    icon: "/logo/svc.nilogin-1.png",
    url: `https://nid.${DOMAIN}/user2/campaign/introNaverIdLoginMobile.nhn`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "기업용 솔루션"
  },
  {
    id: "svc.analytics-1",
    name: "네이버 애널리틱스",
    description: "온라인 비즈니스를 이해하기 위한 필수 도구",
    icon: "/logo/svc.analytics-1.png",
    url: `https://analytics.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "기업용 솔루션"
  },
  {
    id: "svc.ncloud-1",
    name: "네이버 클라우드 플랫폼",
    description: "안정적인 비즈니스의 기반이 되는 클라우드",
    icon: "/logo/svc.ncloud-1.png",
    url: `https://www.ncloud.com/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "기업용 솔루션"
  },
  {
    id: "svc.works-1",
    name: "네이버웍스",
    description: "네이버가 만든 업무용 협업 도구",
    icon: "/logo/svc.works-1.png",
    url: `https://naver.worksmobile.com/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "기업용 솔루션"
  },
  {
    id: "svc.searchad-1",
    name: "검색광고",
    description: "정보를 찾는 고객과 만나는 확실한 방법",
    icon: "/logo/svc.searchad-1.png",
    url: `https://searchad.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "광고"
  },
  {
    id: "svc.displayad-1",
    name: "디스플레이광고",
    description: "3천만 사용자에게 비즈니스 가치 전달",
    icon: "/logo/svc.displayad-1.png",
    url: `https://displayad.${DOMAIN}/`,
    category: "파트너서비스",
    categoryCode: "PARTNER",
    subCategory: "광고"
  },
  {
    id: "menu.SHOPPING",
    name: "쇼핑판",
    description: "오늘의 세일 소식과 최신 트렌드가 한 곳에",
    icon: "/logo/menu.SHOPPING.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=SHOPPING&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.outlet-1",
    name: "패션타운 아울렛",
    description: "고민은 배송만 늦출 뿐, 할인 득템 찬스",
    icon: "/logo/svc.outlet-1.png",
    url: `https://shopping.${DOMAIN}/window/outlet/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.GAMEAPP",
    name: "게임판",
    description: "내 손안의 즐거움, 게임보다 즐거운 게임판",
    icon: "/logo/menu.GAMEAPP.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=GAMEAPP&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.smartboard-1",
    name: "스마트보드",
    description: "어디서나 편리하게, 똑똑한 내 키보드",
    icon: "/logo/svc.smartboard-1.png",
    url: `https://keyboard.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.whale-1",
    name: "웨일 브라우저",
    description: "인터넷의 새로운 시작",
    icon: "/logo/svc.whale-1.png",
    url: `https://whale.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.HEALTH",
    name: "건강판",
    description: "건강을 향한 한 걸음, 함께 시작해요",
    icon: "/logo/menu.HEALTH.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=HEALTH&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.pkgtour-1",
    name: "티켓·패키지",
    description: "패키지 여행을 쉽게 찾고 구매하는 서비스",
    icon: "/logo/svc.pkgtour-1.png",
    url: `https://m-pkgtour.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.care-1",
    name: "네이버케어",
    description: "아픈 증상으로 확인하는 건강체크 서비스",
    icon: "/logo/svc.care-1.png",
    url: `https://care.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.academic-1",
    name: "학술정보",
    description: "국내외 학술정보, 논문 및 저널 정보 제공",
    icon: "/logo/svc.academic-1.png",
    url: `https://academic.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.moneybook-1",
    name: "가계부",
    description: "똑똑하게 절약하는 습관",
    icon: "/logo/svc.moneybook-1.png",
    url: `https://moneybook.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.clovanote-1",
    name: "클로바노트",
    description: "AI 음성인식 기술 활용 녹음 기록 서비스",
    icon: "/logo/svc.clovanote-1.png",
    url: `https://clovanote.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.korean-1",
    name: "국어사전",
    description: "한국어 대사전 3종 동시 제공",
    icon: "/logo/svc.korean-1.png",
    url: `https://ko.dict.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.BOOM",
    name: "뿜판",
    description: "하루에 한 번은 뿜자! 오늘 유머는 여기에",
    icon: "/logo/menu.BOOM.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=BOOM&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.brandfashion-1",
    name: "패션타운 브랜드직영몰",
    description: "믿고 구매하는 공식 스토어",
    icon: "/logo/svc.brandfashion-1.png",
    url: `https://shopping.${DOMAIN}/window/brand-fashion/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.catalan-1",
    name: "데이터랩",
    description: "네이버의 다양한 데이터 트렌드를 한눈에",
    icon: "/logo/svc.catalan-1.png",
    url: `https://datalab.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.NEWS",
    name: "뉴스판",
    description: "언론사별, 분야별 뉴스 기사 제공",
    icon: "/logo/menu.NEWS.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=NEWS&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.clovadubbing-1",
    name: "클로바더빙",
    description: "타이핑만 하면 AI 성우 더빙이 뚝딱",
    icon: "/logo/svc.clovadubbing-1.png",
    url: `https://clovadubbing.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.bandkids-1",
    name: "밴드 키즈",
    description: "어린이를 위한 안전한 모임 앱",
    icon: "/logo/svc.bandkids-1.png",
    url: `https://docs.band.us/d/promotion/bandkids`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.localfood-1",
    name: "푸드윈도",
    description: "전국 식재료와 푸짐한 로컬 푸드가 집으로",
    icon: "/logo/svc.localfood-1.png",
    url: `https://swindow.${DOMAIN}/fresh/home`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.ENT",
    name: "엔터판",
    description: "지금 핫한 엔터 소식, 피드로 즐겨보세요!",
    icon: "/logo/menu.ENT.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=ENT&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.luxury-1",
    name: "럭셔리",
    description: "럭셔리브랜드의 단독상품&본사혜택이 한자리에",
    icon: "/logo/svc.luxury-1.png",
    url: `https://shopping.${DOMAIN}/luxury/home`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.endic-1",
    name: "영어사전",
    description: "657만 단어 수록,유의어,동의어 제공",
    icon: "/logo/svc.endic-1.png",
    url: `https://en.dict.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.happybean-1",
    name: "해피빈",
    description: "네이버 온라인 기부 포털",
    icon: "/logo/svc.happybean-1.png",
    url: `https://happybean.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.FADEOUT-SHOPPING",
    name: "쇼핑판",
    description: "종료된 주제판입니다.",
    icon: "/logo/menu.FADEOUT-SHOPPING.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=FADEOUT-SHOPPING&showConfirm=false&newMain=Y`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.FASHION-BEAUTY",
    name: "패션뷰티판",
    description: "취향을 채우는 패션뷰티 라이프",
    icon: "/logo/menu.FASHION-BEAUTY.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=FASHION-BEAUTY&showConfirm=false&newMain=Y`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.benefit-1",
    name: "쿠폰/혜택",
    description: "나에게 딱 맞는 혜택 모아보기",
    icon: "/logo/svc.benefit-1.png",
    url: `https://shopping.${DOMAIN}/benefit`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.FADEOUT-GUIDE",
    name: "안내판",
    description: "네이버앱 업데이트에 대한 안내",
    icon: "/logo/menu.FADEOUT-GUIDE.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=FADEOUT-GUIDE&showConfirm=false&newMain=Y`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.jpdic-1",
    name: "일본어사전",
    description: "JLPT단어,일한/한일/일일 사전 수록",
    icon: "/logo/svc.jpdic-1.png",
    url: `https://ja.dict.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.bizschool-1",
    name: "네이버 비즈니스 스쿨",
    description: "네이버 비즈니스 스쿨",
    icon: "/logo/svc.bizschool-1.png",
    url: `https://bizschool.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.mr-1",
    name: "미스터",
    description: "핫한 남성 프리미엄 패션 전문 편집샵",
    icon: "/logo/svc.mr-1.png",
    url: `https://shopping.${DOMAIN}/mister/trends`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.globalshopping-1",
    name: "패션타운 해외직구",
    description: "쉽고 빠른 100％ 직배송 직구",
    icon: "/logo/svc.globalshopping-1.png",
    url: `https://shopping.${DOMAIN}/window/foreign/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.BBOOM",
    name: "웹툰판",
    description: "매일매일 새로운 재미 오늘의 웹툰!",
    icon: "/logo/menu.BBOOM.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=BBOOM&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.book-1",
    name: "도서",
    description: "책으로 만나는 새로운 세상",
    icon: "/logo/svc.book-1.png",
    url: `https://book.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.prismlivestudio-1",
    name: "PRISM Live",
    description: "스마트폰과 PC에서 누리는 라이브 스트리밍",
    icon: "/logo/svc.prismlivestudio-1.png",
    url: `https://prismlive.com/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.LIVINGHOME",
    name: "리빙푸드판",
    description: "오늘을 맛있게, 공간을 새롭게",
    icon: "/logo/menu.LIVINGHOME.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=LIVINGHOME&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.china-1",
    name: "중국어사전",
    description: "HSK등급단어,중국어 발음듣기 등 제공",
    icon: "/logo/svc.china-1.png",
    url: `https://zh.dict.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.beautywindow-1",
    name: "패션타운 뷰티",
    description: "빠르게 만나는 뷰티 브랜드 공식스토어",
    icon: "/logo/svc.beautywindow-1.png",
    url: `https://shopping.${DOMAIN}/window/beauty/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.PLACE",
    name: "우리동네판",
    description: "동네소식과 정보, 이웃의 이야기를 만나요",
    icon: "/logo/menu.PLACE.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=PLACE&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.department-1",
    name: "패션타운 백화점",
    description: "오픈런 없이 만나는 백화점의 모든 신상",
    icon: "/logo/svc.department-1.png",
    url: `https://shopping.${DOMAIN}/window/department/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.avgt-1",
    name: "N배송",
    description: "언제 도착하는지 확실히 알려드려요",
    icon: "/logo/svc.avgt-1.png",
    url: `https://shopping.${DOMAIN}/logistics/home`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.SPORTS",
    name: "스포츠판",
    description: "스포츠의 모든 정보를 실시간으로 보세요",
    icon: "/logo/menu.SPORTS.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=SPORTS&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.LECTURE",
    name: "지식판",
    description: "핵심만 쏙, 요즘 뜨는 지식 트렌드",
    icon: "/logo/menu.LECTURE.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=LECTURE&showConfirm=false&newMain=Y`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.dwindow-1",
    name: "패션타운 디자이너",
    description: "디자이너의 패션쇼 아이템을 손안에",
    icon: "/logo/svc.dwindow-1.png",
    url: `https://shopping.${DOMAIN}/window/designer/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.papago-1",
    name: "파파고",
    description: "내 손안의 똑똑한 AI 번역기",
    icon: "/logo/svc.papago-1.png",
    url: `https://papago.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.hanja-1",
    name: "한자사전",
    description: "급수별 한자 목록,획순,유래 정보 제공",
    icon: "/logo/svc.hanja-1.png",
    url: `https://hanja.dict.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.CARGAME",
    name: "카테크판",
    description: "자동차와 테크, 더 나은 일상 시작",
    icon: "/logo/menu.CARGAME.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=CARGAME&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.DATA",
    name: "경제판",
    description: "오늘의 경제, 나를 움직이는 정보",
    icon: "/logo/menu.DATA.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=DATA&showConfirm=false&newMain=Y`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.biztrip-1",
    name: "해외출장",
    description: "출장을 위한 해외항공, 호텔 검색 서비스",
    icon: "/logo/svc.biztrip-1.png",
    url: `https://biztrip.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.note-1",
    name: "쪽지",
    description: "간편하게 주고받는 이야기",
    icon: "/logo/svc.note-1.png",
    url: `https://note.${DOMAIN}/`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.stylewindow-1",
    name: "패션타운 소호&스트릿",
    description: "패션 유목민 정착시킬 인기 쇼핑몰",
    icon: "/logo/svc.stylewindow-1.png",
    url: `https://shopping.${DOMAIN}/window/style/category`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "menu.LIVING",
    name: "여행맛집판",
    description: "세상 모든 여행, 맛집의 새로운 발견",
    icon: "/logo/menu.LIVING.png",
    url: `https://${DOMAIN}/naverapp/?cmd=onMenu&menuCode=LIVING&showConfirm=false`,
    category: "기타",
    categoryCode: "ETC"
  },
  {
    id: "svc.promotion-1",
    name: "오늘끝딜",
    description: "24시간 한정! 특가 상품 득템하기",
    icon: "/logo/svc.promotion-1.png",
    url: `https://shopping.${DOMAIN}/promotion`,
    category: "기타",
    categoryCode: "ETC"
  }
];

export default shortcuts;
