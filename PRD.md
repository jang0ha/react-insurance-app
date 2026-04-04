# 보험 AI 어시스턴트 - PRD (Product Requirements Document)

## 📋 프로젝트 개요

**프로젝트명**: React Insurance AI Assistant
**설명**: AI 기반 보험 상담 어시스턴트 웹 애플리케이션
**타입**: SPA (Single Page Application)
**기술 스택**: React 19 + TypeScript + Vite + Styled-Components + SCSS

---

## 🎯 프로젝트 목표

1. **사용자 친화적 보험 상담 경험** 제공
2. **실시간 AI 기반 자동 응답** 시스템 구축
3. **보험 상품 추천** 및 비교 기능 제공
4. **모바일 친화적 반응형 디자인** 구현
5. **접근성(A11y) 표준** 준수

---

## 📱 핵심 기능

### 1. AI 채팅 시스템
- **실시간 스트리밍 응답**: Claude/Gemini API를 통한 토큰 기반 스트리밍
- **대화 상태 관리**: Idle, Loading, Streaming 상태 관리
- **오류 처리**: API 실패 시 사용자 친화적 오류 메시지 표시
- **대화 초기화**: 채팅 이력 삭제 및 초기 상태로 리셋
- **스트리밍 중단**: 응답 도중 사용자가 언제든 중지 가능

### 2. 보험 상품 카로셀
- **상품 표시**: 여러 보험 상품을 카로셀 형태로 제시
- **상품 선택**: 클릭하여 해당 상품에 대한 상담 시작
- **자동 질문 생성**: "상품명에 대해 알려줘"라는 메시지 자동 생성

### 3. 대화형 UI
- **메시지 버블**: 사용자/AI 메시지 구분 표시
- **로딩 인디케이터**: 응답 대기 중 애니메이션 표시
- **자동 높이 조절**: 입력창의 동적 높이 조절
- **단축키 지원**: Enter(전송), Shift+Enter(줄바꿈)
- **문자 수 표시**: 입력한 문자/최대 문자 표시

### 4. 접근성 지원
- **ARIA 레이블**: 모든 대화형 요소에 접근성 레이블 추가
- **스크린 리더 지원**: 숨겨진 텍스트(SR Only) 포함
- **키보드 네비게이션**: 모든 기능 키보드로 접근 가능
- **시맨틱 HTML**: 올바른 HTML 구조 사용

---

## 🏗️ 프로젝트 구조

```
react-insurance-app/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── Button.tsx        # 버튼 컴포넌트
│   │   ├── Card.tsx          # 카드 컴포넌트
│   │   ├── ChatInput/        # 메시지 입력 컴포넌트
│   │   │   ├── ChatInput.tsx
│   │   │   └── README.md
│   │   ├── LoadingDots/      # 로딩 애니메이션
│   │   ├── MessageBubble/    # 메시지 표시 컴포넌트
│   │   ├── MessageList/      # 메시지 목록
│   │   ├── ProductCard/      # 상품 카드
│   │   ├── ProductCarousel/  # 상품 카로셀
│   │   └── index.ts          # 컴포넌트 익스포트
│   ├── data/
│   │   └── products.ts       # 보험 상품 데이터
│   ├── hooks/
│   │   └── useChat.ts        # 채팅 로직 훅
│   ├── services/
│   │   └── claudeService.ts  # Claude/Gemini API 통신
│   ├── styles/
│   │   ├── global.scss       # 전역 스타일
│   │   ├── theme.ts          # Styled-Components 테마
│   │   ├── common.ts         # 공통 스타일 유틸리티
│   │   └── styled.d.ts       # TypeScript 타입 정의
│   ├── types/
│   │   └── index.ts          # 글로벌 TypeScript 타입
│   ├── App.tsx               # 메인 애플리케이션 컴포넌트
│   ├── main.tsx              # 앱 진입점
│   └── vite-env.d.ts         # Vite 타입 정의
├── index.html                # HTML 템플릿
├── package.json              # 프로젝트 의존성
├── tsconfig.json             # TypeScript 설정
├── vite.config.ts            # Vite 빌드 설정
├── STYLING_GUIDE.md          # 스타일링 가이드
├── PRD.md                    # 이 파일
└── .env                      # 환경 변수

```

---

## 🔧 기술 스택

### Frontend Framework
- **React** 19.2.4: UI 라이브러리
- **TypeScript** 6.0.2: 정적 타입 지원

### Styling
- **Styled-Components** 6.3.12: CSS-in-JS 스타일링
- **SCSS** 1.98.0: 전역 스타일시트
- **하이브리드 접근**: SCSS (전역) + Styled-Components (컴포넌트)

### Build & Development
- **Vite** 8.0.3: 번들러 및 개발 서버
- **@vitejs/plugin-react** 6.0.1: React 플러그인

### AI & APIs
- **@google/generative-ai** 0.24.1: Google Gemini API (대체용)

### Animations & UI
- **GSAP** 3.14.2: 고급 애니메이션 라이브러리
- **Swiper** 12.1.3: 카로셀/슬라이더 컴포넌트

### Type Definitions
- **@types/react** 19.2.14
- **@types/react-dom** 19.2.3
- **@types/styled-components** 5.1.36
- **@types/node** 25.5.0

---

## 📊 데이터 모델

### Message 타입
```typescript
interface Message {
  id: string;                    // 고유 ID (UUID)
  role: 'user' | 'assistant';    // 메시지 발신자
  content: string;               // 메시지 내용
  timestamp: Date;               // 발송 시간
  isStreaming?: boolean;         // 스트리밍 중 여부
}
```

### ChatStatus 타입
```typescript
type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error';
```

### InsuranceProduct 타입
```typescript
interface InsuranceProduct {
  id: string;           // 상품 고유 ID
  name: string;         // 상품명
  company: string;      // 보험사명
  monthlyPremium: number; // 월 보험료
  coverage: string[];   // 보장 내용
  badge?: string;       // 배지 (추천, 신상품 등)
  recommended?: boolean; // 추천 여부
}
```

---

## 🔌 API 통신

### Claude/Gemini API 스트리밍
**파일**: `src/services/claudeService.ts`

- **프로토콜**: REST API + Server-Sent Events (SSE)
- **기능**: 실시간 토큰 스트리밍
- **오류 처리**: AbortController를 통한 취소 지원
- **상태**: 대화 컨텍스트 포함 전송

**호출 시그니처**:
```typescript
streamClaudeResponse(
  messages: Message[],
  signal: AbortSignal
): AsyncIterableIterator<string>
```

---

## 🎨 디자인 시스템

### 색상 체계
- **Primary**: 주요 액션 버튼
- **Danger**: 위험/경고 상황
- **Surface**: 배경색
- **Border**: 경계선
- **Gray Scale**: 텍스트, 비활성 상태

### 간격 시스템
- `--spacing-sm`: 작은 간격
- `--spacing-md`: 중간 간격
- `--spacing-lg`: 큰 간격

### 타이포그래피
- `--font-size-sm`: 작은 텍스트
- `--font-size-base`: 기본 텍스트
- `--font-size-2xl`: 제목

### 반응형 브레이크포인트
- Mobile: < 640px
- Tablet: 640px ~ 1024px
- Desktop: > 1024px

---

## 🔐 보안 고려사항

1. **입력 검증**: 사용자 입력 길이 제한 (최대 2000자)
2. **API 키 관리**: `.env` 파일에서 환경 변수 관리
3. **XSS 방지**: React의 자동 escape 및 Styled-Components의 격리
4. **CSRF 방지**: HTTPS 전송, Same-site 쿠키

---

## ♿ 접근성 표준

- **WCAG 2.1 AA** 준수 목표
- **ARIA 레이블**: 모든 상호작용 요소
- **키보드 네비게이션**: Tab, Enter, Escape 지원
- **색상 명도비**: WCAG 표준 이상
- **포커스 인디케이터**: 명확한 시각적 피드백

---

## 📦 빌드 및 배포

### 개발 환경
```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 시작 (http://localhost:5173)
npm run tsc          # TypeScript 타입 체크
```

### 프로덕션 빌드
```bash
npm run build        # 타입 체크 후 번들 생성
npm run preview      # 빌드된 파일 미리보기
```

### 배포 경로
1. `npm run build` 실행
2. `dist/` 폴더 생성
3. 정적 호스팅 서비스에 업로드 (Vercel, Netlify 등)

---

## 📈 성능 목표

- **Lighthouse Score**: 90점 이상
- **First Contentful Paint (FCP)**: < 1.5초
- **Largest Contentful Paint (LCP)**: < 2.5초
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Bundle Size**: < 500KB (gzip)

---

## 🧪 테스트 전략

### 단위 테스트
- 컴포넌트 렌더링 테스트
- 훅 로직 테스트
- 유틸리티 함수 테스트

### 통합 테스트
- 채팅 플로우 E2E 테스트
- API 호출 테스트

### 접근성 테스트
- axe DevTools로 자동 검사
- 스크린 리더 수동 테스트
- 키보드 네비게이션 검증

---

## 🐛 알려진 이슈 및 개선 사항

### 현재 상태 (v1.0)
- ✅ 기본 채팅 기능
- ✅ 상품 카로셀
- ✅ 실시간 스트리밍
- ✅ 접근성 지원

### 향후 개선 사항
- [ ] 사용자 인증 기능
- [ ] 채팅 이력 저장 (Local Storage 또는 DB)
- [ ] 상품 필터링 및 정렬
- [ ] 다국어 지원 (i18n)
- [ ] 다크 모드
- [ ] 모바일 앱 (React Native)
- [ ] PWA 지원

---

## 📚 개발 가이드

### 새 컴포넌트 작성
1. `src/components/YourComponent.tsx` 생성
2. Props 타입을 `src/types/index.ts`에 정의
3. Styled-Components 사용하여 스타일 정의
4. 접근성 속성(aria-label, role 등) 추가
5. `src/components/index.ts`에 export 추가

### 스타일링 가이드
→ `STYLING_GUIDE.md` 참고

### 타입 정의
→ `src/types/index.ts` 참고

### 컴포넌트별 문서
- `src/components/ChatInput/README.md`

---

## 📞 연락처 및 지원

- **개발팀**: jang0ha
- **저장소**: React Insurance AI Assistant
- **문제 보고**: GitHub Issues

---

**마지막 업데이트**: 2026-04-05
**버전**: v1.0.0
**상태**: Active Development
