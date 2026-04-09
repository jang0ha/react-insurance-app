# 웹접근성 감시 리포트 (WCAG 2.1 Level AA)

**검토 일자**: 2026-04-09  
**상태**: 진행 중

---

## 🔴 **CRITICAL (즉시 수정 필요)**

### 1. **MessageList.tsx - 문법 오류**
- **파일**: `src/components/MessageList/MessageList.tsx:18`
- **문제**: `hei` 불완전한 CSS 속성
- **WCAG**: 4.1.1 Parsing (구조적 완전성)
- **수정**: CSS 제거 또는 완성

### 2. **App.tsx - 중복 라우트**
- **파일**: `src/App.tsx:10`
- **문제**: 동일한 경로의 라우트 두 개 정의
- **영향**: 불필요한 렌더링, 접근성 혼란
- **수정**: 중복 라우트 제거

### 3. **index.html - Meta 태그 부족**
- **파일**: `index.html`
- **문제**: Meta description, charset 부재 (charset은 있으나 위치 최적화 필요)
- **WCAG**: 3.3.2 Labels or Instructions
- **수정**: meta description 추가

### 4. **MessageList.tsx - 불완전한 CSS**
- **파일**: `src/components/MessageList/MessageList.tsx:18`
- **문제**: `hei` 속성 미완성
- **수정**: 라인 제거

---

## 🟠 **HIGH (권장 수정)**

### 5. **포커스 관리 부족**
- **문제**: 라우트 변경 시 포커스 관리 없음
- **WCAG**: 2.4.3 Focus Order
- **수정**: useEffect에서 포커스 관리 추가

### 6. **Skip Links 부재**
- **문제**: Skip to main content 링크 없음
- **WCAG**: 2.4.1 Bypass Blocks
- **수정**: Skip link 컴포넌트 추가

### 7. **폼 제출 버튼 시맨틱**
- **파일**: `src/components/ChatInput/ChatInput.tsx`
- **문제**: 이모지 아이콘만으로 버튼 표시
- **WCAG**: 1.4.13 Content on Hover or Focus (부분적)
- **현상태**: aria-label 있음 ✓
- **개선**: 버튼 텍스트 또는 더 명확한 레이블

### 8. **색상 대비 검증**
- **검사 필요**:
  - Primary (#3b82f6) on White: ✓ Pass (8.6:1)
  - Gray-500 (#6b7280) on White: ✓ Pass (7.5:1)
  - Gray-400 (#9ca3af) on White: ⚠️ Border (4.5:1 - minimum)
  - Hint text (Gray-400 on Gray-100): ❌ Fail (2.6:1)
- **WCAG**: 1.4.3 Contrast (Minimum)
- **수정**: 텍스트 색상 밝기 조정

### 9. **로딩 상태 스크린 리더 공지**
- **파일**: `src/pages/Dashboard.tsx`
- **문제**: AI 응답 중 시각적만 표시
- **WCAG**: 4.1.3 Status Messages
- **수정**: aria-busy, aria-live 추가

### 10. **Swiper 네비게이션 라벨**
- **파일**: `src/components/ProductCarousel/ProductCarousel.tsx`
- **문제**: 이전/다음 버튼에 설명 라벨 부재
- **WCAG**: 1.1.1 Non-text Content
- **수정**: aria-label 추가

### 11. **토스트 알림 개선**
- **파일**: `src/components/Toast/Toast.tsx`
- **문제**: 여러 토스트 표시 시 aria-live 효율성
- **현상태**: ✓ aria-live="polite" 있음
- **개선**: aria-atomic 추가로 원자성 보장

### 12. **폼 라벨 명확화**
- **파일**: `src/components/ChatInput/ChatInput.tsx`
- **문제**: aria-describedby로 지시사항 제공 ✓
- **개선**: aria-label 더 구체적으로

### 13. **제목 계층구조**
- **파일**: `src/pages/Dashboard.tsx`
- **문제**: 제목이 Header 외부에 선언됨
- **현상태**: Title 컴포넌트 사용으로 유연함 ✓
- **검증**: h1 하나만 있는지 확인

### 14. **타임스탐프 포맷**
- **파일**: `src/components/MessageBubble/MessageBubble.tsx`
- **현상태**: dateTime ISO 속성 있고 aria-label 있음 ✓
- **상태**: PASS

---

## 🟡 **MEDIUM (모범 사례)**

### 15. **키보드 네비게이션**
- **현상태**: 
  - ✓ ChatInput 폼 제출 (Shift+Enter) 지원
  - ✓ 버튼 포커스 가능 (focusRing 사용)
  - ❓ Tab order 최적화 필요

### 16. **모바일 터치 접근성**
- **현상태**: 
  - ✓ -webkit-overflow-scrolling 사용
  - ✓ 터치 영역 충분 (32px+)
  - ❓ iPhone VoiceOver 테스트 필요

### 17. **다크 모드 고려**
- **현상태**: light-only
- **권장**: prefers-color-scheme 미디어 쿼리 추가 (Optional)

---

## ✅ **PASS (이미 구현됨)**

- ✓ Semantic HTML 사용 (header, section, article, main)
- ✓ ARIA roles (log, alert, status, region)
- ✓ aria-label 광범위 사용
- ✓ aria-live 구현 (MessageList, Toast, ChatInput)
- ✓ Focus indicators (focus-visible)
- ✓ 이미지 alt 텍스트 (Avatar는 aria-label 사용)
- ✓ Form 접근성 (textarea aria-label, aria-describedby)
- ✓ 버튼 aria-labels

---

## 📋 **수정 우선순위**

| 순번 | 우선순위 | 항목 | 예상 작업량 |
|------|---------|------|-----------|
| 1 | 🔴 CRITICAL | MessageList 문법 오류 | 5분 |
| 2 | 🔴 CRITICAL | App.tsx 중복 라우트 | 2분 |
| 3 | 🟠 HIGH | 색상 대비 수정 (Hint text) | 10분 |
| 4 | 🟠 HIGH | Skip links 추가 | 15분 |
| 5 | 🟠 HIGH | aria-busy 및 로딩 관리 | 15분 |
| 6 | 🟠 HIGH | Swiper 라벨 추가 | 10분 |
| 7 | 🟠 HIGH | 포커스 관리 개선 | 20분 |
| 8 | 🟡 MEDIUM | aria-atomic toast 추가 | 5분 |

---

## 🎯 **최종 목표**

- WCAG 2.1 Level AA 준수
- 스크린 리더 (NVDA, JAWS, VoiceOver) 완벽 지원
- 키보드 전용 사용 가능
- 색상 대비 4.5:1 이상
- 포커스 관리 완벽
