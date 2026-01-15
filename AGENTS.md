## Repository Purpose

- 네이버 바로가기 페이지 프로젝트의 목적과 범위를 설명한다.
- [입력 필요] 대상 사용자/핵심 가치/지원 범위를 한 줄로 명시한다.

## Allowed / Forbidden Actions

- 허용: 규칙에 맞는 브랜치 생성 후 코드 수정
- 금지: `main`, `release/v<버전>` 브랜치 직접 수정
- 금지: 브랜치 분기 없이 코드 수정
- 금지: 개발자 승인 없이 브랜치 병합 진행
- 병합: 요청 시 한 단계 상위 브랜치로 병합하고 메시지에 수정 내용 명시

## Tech Stack & Versions

- Node.js, npm
- Next.js
- TypeScript
- [입력 필요] 최소 지원 Node.js 버전, 패키지 매니저 고정 여부, 주요 라이브러리 버전

## Project Structure

- `src/`: 애플리케이션 소스 코드
- `public/`: 정적 리소스
- `resource/`: 프로젝트 README.md 관련 파일
- `src/app/directory`: nextjs 라우트 규칙에 따른 폴더 구조

## Coding Rules

- 코드 수정 후 `npm run lint` 실행
- 기존 코드 최대한 재활용
- 코드 최대한 간결하게 작성
- 코드 추가 시 재활용 가능한 구조로 작성
- 유지보수 관점에서 코드 작성
- [입력 필요] 코드 스타일(예: 함수명 규칙, 파일명 규칙), 포맷터 사용 여부

## Setup & Run

- npm i
- npm run dev

## Testing & Quality

- `npm run lint` 실행

## Security & Data

- 금지: 비밀 키/토큰 커밋

## 버전 관리

1. release/v<버전> 로 배포
2. 버전은 1.0.0 으로 시작

## 브랜치 규칙

1. `git branch --show-current`로 현재 브랜치 확인
2. `main`이거나 규칙과 다르면 새 브랜치를 생성한 뒤 작업 시작
3. 새 브랜치 이름 규칙
   - 기본: `<현재 브랜치>/fix-<수정할 내용>`
   - 현재 브랜치가 `main`일 때: `dev/fix-<수정할 내용>/main`
   - 이슈 번호 기준: `<현재 브랜치>/fix-<issue 번호>`
