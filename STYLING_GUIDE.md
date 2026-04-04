# Styling Guide

이 프로젝트는 **SCSS (전역 스타일)** + **Styled-Components (컴포넌트 스타일)** 하이브리드 접근을 사용합니다.

## 📁 파일 구조

```
src/
├── styles/
│   ├── global.scss           # 전역 스타일 (리셋, 변수, 기본 스타일)
│   ├── theme.ts              # Styled-Components 테마 정의
│   ├── styled.d.ts           # TypeScript 타입 정의
│   └── common.ts             # 공통 스타일 유틸리티
├── components/
│   ├── Button.tsx            # 예제: 스타일드 컴포넌트
│   └── Card.tsx              # 예제: 스타일드 컴포넌트
└── types/
    └── index.ts              # 글로벌 타입 정의
```

## 🎨 SCSS vs Styled-Components

### SCSS (전역 스타일)
- **사용처**: 전역 리셋, CSS 변수, 기본 요소 스타일
- **파일**: `src/styles/global.scss`
- **주요 역할**:
  - CSS 변수 정의 (색상, 간격, 폰트)
  - 기본 요소 스타일 (body, button, input, a)
  - 글로벌 애니메이션 정의

### Styled-Components (컴포넌트 스타일)
- **사용처**: React 컴포넌트별 스타일
- **장점**:
  - JavaScript 로직 활용 가능
  - Props를 통한 동적 스타일링
  - CSS-in-JS로 로컬 스코핑 자동
  - 타입 안정성

## 🚀 컴포넌트 작성 가이드

### 기본 패턴

```tsx
import styled from 'styled-components';
import { ButtonProps } from '../types';

// Props 타입 정의 ($ 접두어: 전달된 props를 DOM에 보내지 않음)
interface StyledButtonProps {
  $variant: 'primary' | 'secondary';
  $size: 'sm' | 'md' | 'lg';
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: ${(props) => props.theme.spacing[props.$size]};
  background-color: ${(props) => props.theme.colors[props.$variant]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    opacity: 0.9;
  }
`;

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <StyledButton $variant={variant} $size={size} {...props} />;
}
```

### Props 전달 시 주의사항

```tsx
// ❌ 잘못된 방법 (DOM에 불필요한 props 전달)
const StyledDiv = styled.div`
  color: ${(props) => props.color};
`;
<StyledDiv color="blue" /> // 'color' prop이 DOM에 전달됨

// ✅ 올바른 방법 ($ 접두어 사용)
const StyledDiv = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
`;
<StyledDiv $color="blue" /> // DOM에 전달되지 않음
```

## 🎯 테마 사용

### 테마 객체 구조

```ts
// src/styles/theme.ts에서 정의됨
theme.colors.primary              // '#3b82f6'
theme.colors.gray[50]             // '#f9fafb'
theme.typography.fontSize.base    // '1rem'
theme.spacing.md                  // '1rem'
theme.borderRadius.lg             // '0.5rem'
theme.shadow.md                   // '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
theme.transitions.normal          // '300ms ease-in-out'
theme.breakpoints.md              // '768px'
```

### 반응형 디자인

```tsx
import styled from 'styled-components';
import { media } from '../styles/common';

const Container = styled.div`
  width: 100%;

  ${(props) => media.md(css`
    max-width: 768px;
    margin: 0 auto;
  `)}
`;
```

## 🛠 공통 유틸리티

`src/styles/common.ts`에서 제공:

```tsx
import { flexCenter, flexBetween, truncate, transition, focusRing } from '../styles/common';
import styled from 'styled-components';

// Flex 중앙 정렬
const CenteredBox = styled.div`
  ${flexCenter}
`;

// 텍스트 자르기
const TruncatedText = styled.p`
  ${truncate}
`;

// 전환 애니메이션
const HoverBox = styled.div`
  ${transition('transform', '200ms')}

  &:hover {
    transform: scale(1.1);
  }
`;

// 포커스 스타일 (접근성)
const FocusableButton = styled.button`
  ${focusRing}
`;
```

## 📝 컴포넌트 예제

### Button 컴포넌트
```tsx
// src/components/Button.tsx 참고
import { Button } from './components/Button';

<Button variant="primary" size="md">클릭</Button>
<Button variant="secondary" size="sm">취소</Button>
<Button variant="danger" disabled>삭제</Button>
```

### Card 컴포넌트
```tsx
// src/components/Card.tsx 참고
import { Card } from './components/Card';

<Card variant="elevated" padding="lg">
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</Card>
```

## 🌐 CSS 변수 (SCSS에서 정의)

글로벌 SCSS에서 CSS 변수로도 접근 가능:

```scss
// HTML/CSS에서 사용
color: var(--color-primary);
padding: var(--spacing-md);
border-radius: var(--radius-lg);
```

## ⚡ 성능 최적화

### 1. 동적 스타일은 Props 사용
```tsx
// ❌ 효율적이지 않음
const Box = styled.div`
  color: ${Math.random() > 0.5 ? 'red' : 'blue'};
`;

// ✅ 효율적임
const Box = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
`;
```

### 2. 큰 조건부 스타일은 css helper 사용
```tsx
import styled, { css } from 'styled-components';

const isLarge = css`
  font-size: 2rem;
  padding: 2rem;
`;

const Text = styled.div`
  ${(props) => props.$isLarge && isLarge}
`;
```

## 🔍 TypeScript 지원

### 컴포넌트 Props 타입 정의

```tsx
// src/types/index.ts에서 정의
export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// 사용
import { Button } from './components/Button';
import type { ButtonProps } from './types';

const handleClick: ButtonProps['onClick'] = (e) => {
  console.log(e);
};
```

## 🎓 FAQ

### Q: 프로젝트가 작은데 SCSS를 써도 될까?
**A:** 예, 괜찮습니다! 이 프로젝트 구조에서 SCSS는:
- 전역 리셋과 CSS 변수만 담당 (오버헤드 최소)
- Styled-Components와 조화
- 미래 확장성 확보
- 개별 컴포넌트는 Styled-Components로 가볍게 유지

### Q: 새 컴포넌트는 어떻게 만들어야 하나요?
**A:** 
1. `src/components/YourComponent.tsx` 생성
2. Props 타입은 `src/types/index.ts`에 정의
3. Styled-Components 사용
4. 테마에서 색상, 간격 등 참조

### Q: CSS 클래스를 직접 쓸 수는 없나요?
**A:** 가능하지만 권장하지 않습니다:
- Styled-Components가 자동으로 스코핑
- 네이밍 충돌 방지
- Props 기반 동적 스타일 편함

## 📚 참고 링크

- [Styled-Components 공식 문서](https://styled-components.com/)
- [SCSS 공식 문서](https://sass-lang.com/)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)
