# Naver Shortcut

네이버 컨텐츠를 커스텀한 바로가기 페이지

## 기능

- 네이버 통합, 지도, 쇼핑 검색 지원
- 네이버 컨텐츠 바로가기 추가

## 스크린샷

![스크린샷](./resource/01.jpg)
![스크린샷](./resource/02.jpg)
![스크린샷](./resource/03.jpg)

## 기술 스텍

- NextJs
- TypeScript
- TailwindCSS

## 빌드

### npm build

```bash
npm run build
```

### example docker build

```bash
docker build -t naver/shortcut:1.0.0 -f docker/Dockerfile .
```

## 배포

### npm run

```bash
npm run start
```

### example docker run

```bash
docker run -d -p 3000:3000 naver/shortcut:1.0.0
```
