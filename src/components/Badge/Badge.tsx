import styled from 'styled-components';
import { ReactNode } from 'react';
import { BadgeVariant, SizeVariant } from '@/types';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: SizeVariant;
  children: ReactNode;
}

const StyledBadge = styled.span<{ $variant: BadgeVariant; $size: SizeVariant }>`
  display: inline-block;
  padding: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return '2px 8px';
      case 'lg':
        return '6px 12px';
      case 'md':
      default:
        return '4px 10px';
    }
  }};
  border-radius: var(--radius-full);
  font-size: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return 'var(--font-size-xs)';
      case 'lg':
        return 'var(--font-size-sm)';
      case 'md':
      default:
        return 'var(--font-size-sm)';
    }
  }};
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.5px;

  /* Variant Colors */
  background-color: ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return 'var(--color-primary)';
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'danger':
        return '#ef4444';
      case 'secondary':
        return '#8b5cf6';
      default:
        return 'var(--color-primary)';
    }
  }};
  color: white;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export function Badge({ variant = 'primary', size = 'md', children }: BadgeProps) {
  return (
    <StyledBadge $variant={variant} $size={size}>
      {children}
    </StyledBadge>
  );
}
