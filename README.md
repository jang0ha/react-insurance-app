# 보험 AI 어시스턴트 🤖
라이브 : https://insurance-ai-nu.vercel.app/
<div align="center">

**React 기반 AI 채팅 보험 상담 애플리케이션**

[데모](#-주요-기능) · [설치](#-빠른-시작) · [문서](#-문서) · [기술스택](#-기술-스택)

</div>

---

## 📌 프로젝트 소개

사용자가 AI와 실시간으로 대화하며 보험 상품을 추천받고 상담받을 수 있는 웹 애플리케이션입니다. 
Google Gemini API를 통한 실시간 스트리밍 응답, 보험 상품 카로셀, 그리고 완벽한 접근성을 제공합니다.

---

## ✨ 주요 기능

### 🤖 AI 기반 채팅
- **실시간 스트리밍 응답**: 토큰 단위로 실시간 응답 출력
- **대화 컨텍스트 유지**: 이전 대화를 기반한 맥락 있는 답변
- **중단 기능**: 응답 도중 언제든 중지 가능

### 🛍️ 보험 상품 추천
- **카로셀 형태 표시**: Swiper를 이용한 부드러운 슬라이딩
- **상품 정보**: 보험사, 월 보험료, 보장 내용 등 상세 정보
- **클릭 선택**: 상품 클릭 시 자동으로 AI 상담 시작

### 💬 직관적인 대화형 UI
- **메시지 버블**: 사용자/AI 메시지 시각적 구분
- **자동 높이 조절**: 입력창이 자동으로 확장/축소
- **키보드 단축키**: Enter(전송), Shift+Enter(줄바꿈)
- **로딩 애니메이션**: GSAP 기반 부드러운 로딩 표시

### ♿ 접근성
- WCAG 2.1 AA 표준 준수
- ARIA 레이블 및 시맨틱 HTML
- 스크린 리더 완벽 지원
- 키보드 네비게이션

---

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 16+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone <repository-url>
cd react-insurance-app

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일에 Google Gemini API 키 입력

# 4. 개발 서버 실행
npm run dev
# http://localhost:5173 에서 실행됨
```

### 빌드 및 배포

```bash
# 타입 체크 후 빌드
npm run build

# 빌드된 파일 미리보기
npm run preview

# TypeScript 타입 체크만 수행
npm run tsc
```

---

## 📁 프로젝트 구조

```
react-insurance-app/
├── src/
│   ├── components/              # React 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ChatInput/           # 메시지 입력 컴포넌트
│   │   ├── MessageBubble/       # 메시지 표시
│   │   ├── MessageList/         # 메시지 목록
│   │   ├── ProductCard/         # 상품 카드
│   │   ├── ProductCarousel/     # 상품 카로셀
│   │   ├── LoadingDots/         # 로딩 애니메이션
│   │   └── index.ts
│   ├── hooks/
│   │   └── useChat.ts           # 채팅 상태 관리 훅
│   ├── services/
│   │   └── claudeService.ts     # API 통신
│   ├── styles/
│   │   ├── global.scss          # 전역 스타일
│   │   ├── theme.ts             # 테마 정의
│   │   ├── common.ts            # 공통 유틸리티
│   │   └── styled.d.ts
│   ├── data/
│   │   └── products.ts          # 보험 상품 데이터
│   ├── types/
│   │   └── index.ts             # TypeScript 타입
│   ├── App.tsx                  # 메인 컴포넌트
│   └── main.tsx
├── index.html
├── vite.config.ts               # Vite 설정
├── tsconfig.json                # TypeScript 설정
├── package.json
├── README.md                    # 이 파일
├── PRD.md                       # 상세 요구사항
└── STYLING_GUIDE.md             # 스타일링 가이드
```

---

## 🛠️ 기술 스택

### Frontend
- **React** 19.2.4 - UI 라이브러리
- **TypeScript** 6.0.2 - 정적 타입 지원
- **Vite** 8.0.3 - 빌드 도구

### Styling
- **Styled-Components** 6.3.12 - CSS-in-JS
- **SCSS** 1.98.0 - 전역 스타일
- **하이브리드 접근**: SCSS + Styled-Components

### 라이브러리
- **Swiper** 12.1.3 - 카로셀 컴포넌트
- **GSAP** 3.14.2 - 애니메이션
- **@google/generative-ai** 0.24.1 - Gemini API

---

## 📖 문서

더 자세한 정보는 다음 문서들을 참고하세요:

| 문서 | 설명 |
|------|------|
| **[PRD.md](./PRD.md)** | 프로젝트 요구사항 및 상세 사양 |
| **[STYLING_GUIDE.md](./STYLING_GUIDE.md)** | 스타일링 가이드 및 컴포넌트 패턴 |

---

## 💻 개발 가이드

### 환경 설정

```bash
# Node 버전 확인
node --version

# 타입 체크
npm run tsc

# 개발 중 타입 에러 확인
npm run tsc -- --noEmit
```

### 새 컴포넌트 작성

1. `src/components/YourComponent.tsx` 생성
2. Props 타입을 `src/types/index.ts`에 정의
3. Styled-Components로 스타일 정의
4. ARIA 속성 추가 (접근성)
5. `src/components/index.ts`에 export

자세한 가이드: [STYLING_GUIDE.md](./STYLING_GUIDE.md)

### 코드 컨벤션

- **파일명**: PascalCase (컴포넌트), camelCase (유틸)
- **컴포넌트**: 함수형 + React Hooks
- **타입**: TypeScript 사용
- **스타일**: Styled-Components 기본, SCSS는 전역만

---

## 🔒 보안

- 환경 변수로 API 키 관리
- XSS 방지: React 자동 escape
- CSRF 방지: HTTPS 전송 권장
- 입력 검증: 최대 2000자 제한

---

## ♿ 접근성

WCAG 2.1 AA 표준 준수:
- ✅ ARIA 레이블 및 역할
- ✅ 키보드 네비게이션
- ✅ 스크린 리더 지원
- ✅ 충분한 색상 명도비
- ✅ 초점 인디케이터

---

## 📊 성능

- **Lighthouse**: 90점 이상 목표
- **FCP**: < 1.5초
- **LCP**: < 2.5초
- **Bundle Size**: < 500KB (gzip)

---

## 🔄 향후 개선 사항

- [ ] 사용자 인증 (로그인)
- [ ] 채팅 이력 저장
- [ ] 다국어 지원 (i18n)
- [ ] 다크 모드
- [ ] PWA 지원
- [ ] 모바일 앱 (React Native)

---

## 📝 라이센스

ISC

---

## 👤 개발자

**jang0ha**

---

<div align="center">

Made with ❤️ using React + TypeScript

</div>
