import styled, { keyframes } from 'styled-components';
import { SkeletonVariant } from '@/types';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  borderRadius?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const BaseSkeletonStyle = styled.div<{ $width?: string | number; $height?: string | number; $borderRadius?: string }>`
  background: linear-gradient(
    90deg,
    #e5e7eb 0%,
    #f3f4f6 50%,
    #e5e7eb 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${(props) => props.$borderRadius || '0.375rem'};
  width: ${(props) => {
    if (typeof props.$width === 'number') return `${props.$width}px`;
    return props.$width || '100%';
  }};
  height: ${(props) => {
    if (typeof props.$height === 'number') return `${props.$height}px`;
    return props.$height || '1rem';
  }};
`;

const TextSkeleton = styled(BaseSkeletonStyle)`
  height: ${(props) => {
    if (typeof props.$height === 'number') return `${props.$height}px`;
    return props.$height || '0.875rem';
  }};
`;

const CardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
`;

const CardHeader = styled(BaseSkeletonStyle)`
  height: 24px;
  width: 60%;
`;

const CardLine = styled(BaseSkeletonStyle)`
  height: 16px;
  width: 100%;
`;

const MessageSkeleton = styled(BaseSkeletonStyle)`
  height: 60px;
  width: 70%;
  border-radius: var(--radius-bubble);
  margin-bottom: var(--spacing-md);
`;

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  borderRadius,
}: SkeletonProps) {
  if (variant === 'text') {
    return (
      <>
        {Array.from({ length: lines }).map((_, i) => (
          <TextSkeleton
            key={i}
            $width={width}
            $height={height || '1rem'}
            $borderRadius={borderRadius}
            style={{
              marginBottom: i < lines - 1 ? 'var(--spacing-sm)' : 0,
              width: i === lines - 1 && !width ? '80%' : width || '100%',
            }}
          />
        ))}
      </>
    );
  }

  if (variant === 'card') {
    return (
      <CardSkeleton>
        <CardHeader $width={width} $height={height} $borderRadius={borderRadius} />
        <CardLine $width={width} $borderRadius={borderRadius} />
        <CardLine
          $width={width}
          $borderRadius={borderRadius}
          style={{ width: '85%' }}
        />
        <CardLine
          $width={width}
          $borderRadius={borderRadius}
          style={{ width: '70%' }}
        />
      </CardSkeleton>
    );
  }

  if (variant === 'message') {
    return (
      <>
        <MessageSkeleton $width={width} $height={height} $borderRadius={borderRadius} />
        <MessageSkeleton
          $width={width}
          $height={height}
          $borderRadius={borderRadius}
          style={{ width: '50%', marginLeft: 'auto', marginBottom: 'var(--spacing-md)' }}
        />
      </>
    );
  }

  // avatar variant
  return (
    <BaseSkeletonStyle
      $width={width || '40px'}
      $height={height || '40px'}
      $borderRadius="9999px"
    />
  );
}
