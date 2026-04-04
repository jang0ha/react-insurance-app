import styled from 'styled-components';

interface LoadingDotsProps {
  visible: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-sm) 0;
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--color-ai-bg);
  padding: 12px 16px;
  border-radius: var(--radius-bubble);
  border-bottom-left-radius: 4px;
  overflow: hidden;
`;

const Dot = styled.span<{ $index: number }>`
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #9ca3af;
  animation: bounce 0.7s infinite;
  animation-delay: ${props => props.$index * 0.15}s;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export function LoadingDots({ visible }: LoadingDotsProps) {
  if (!visible) return null;

  return (
    <Container role="status" aria-label="AI가 응답 중입니다">
      <Bubble>
        {[0, 1, 2].map(i => (
          <Dot
            key={i}
            $index={i}
            aria-hidden="true"
          />
        ))}
      </Bubble>
    </Container>
  );
}
