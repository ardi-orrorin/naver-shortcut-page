import { CafeIcon, ChzzkIcon, MailIcon, MapPinIcon, PayIcon, SearchIcon, StoreIcon } from "./icons";

const SEARCH_MODE_CONFIG = {
  web: {
    label: "통합 검색",
    placeholder: "검색어를 입력하세요",
    icon: SearchIcon,
    buildUrl: (keyword: string) => `https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`,
    hint: "네이버 통합 검색 결과"
  },
  map: {
    label: "지도 검색",
    placeholder: "지도에서 장소를 검색하세요",
    icon: MapPinIcon,
    buildUrl: (keyword: string) => `https://map.naver.com/p/search/${encodeURIComponent(keyword)}`,
    hint: "네이버 지도에서 위치를 탐색"
  },
  store: {
    label: "스토어 검색",
    placeholder: "스토어에서 상품을 검색하세요",
    icon: StoreIcon,
    buildUrl: (keyword: string) => `https://search.shopping.naver.com/ns/search?query=${encodeURIComponent(keyword)}`,
    hint: "네이버 쇼핑에서 상품 찾기"
  },
  cafe: {
    label: "카페 검색",
    placeholder: "카페에서 글을 검색하세요",
    icon: CafeIcon,
    buildUrl: (keyword: string) => {
      const timestampUnix = Date.now();
      return `https://section.cafe.naver.com/ca-fe/home/search/articles?q=${encodeURIComponent(
        keyword
      )}&t=${timestampUnix}`;
    },
    hint: "네이버 카페 게시글 검색"
  },
  mail: {
    label: "메일 검색",
    placeholder: "메일함에서 내용을 검색하세요",
    icon: MailIcon,
    buildUrl: (keyword: string) =>
      `https://mail.naver.com/v2/folders/0/search?detail=true&body=${encodeURIComponent(
        keyword
      )}&bodyCond=5&exceptTrash=true&type=all`,
    hint: "네이버 메일 본문 검색 (로그인 필요)"
  },
  chzzk: {
    label: "치지직 검색",
    placeholder: "치지직에서 방송을 검색하세요",
    icon: ChzzkIcon,
    buildUrl: (keyword: string) => `https://chzzk.naver.com/search?query=${encodeURIComponent(keyword)}`,
    hint: "치지직 방송 및 클립 검색"
  },
  npay: {
    label: "결제내역 검색",
    placeholder: "네이버페이 결제내역을 검색하세요",
    icon: PayIcon,
    buildUrl: (keyword: string) => `https://pay.naver.com/pc/history?keyword=${encodeURIComponent(keyword)}`,
    hint: "네이버페이 결제내역 검색 (로그인 필요)"
  }
} as const;

const searchConfig = {
  searchModeConfig: SEARCH_MODE_CONFIG
};

export default searchConfig;
