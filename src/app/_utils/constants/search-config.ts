import { MapPinIcon, SearchIcon, StoreIcon } from "./icons";

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
  }
} as const;

const searchConfig = {
  searchModeConfig: SEARCH_MODE_CONFIG
};

export default searchConfig;
