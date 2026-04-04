import styled from 'styled-components';
import { CardProps } from '../types';

interface StyledCardProps {
  $variant: NonNullable<CardProps['variant']>;
  $padding: NonNullable<CardProps['padding']>;
}

const paddingMap = {
  sm: (props: { theme: any }) => props.theme.spacing.md,
  md: (props: { theme: any }) => props.theme.spacing.lg,
  lg: (props: { theme: any }) => props.theme.spacing.xl,
};

const StyledCard = styled.div<StyledCardProps>`
  padding: ${(props) => paddingMap[props.$padding](props)};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background-color: white;
  min-width:200px;

  ${(props) =>
    props.$variant === 'elevated'
      ? `box-shadow: ${props.theme.shadow.md};`
      : `border: 1px solid ${props.theme.colors.gray[200]};`}
`;

export function Card({
  variant = 'elevated',
  padding = 'md',
  children,
  className,
}: CardProps) {
  return (
    <StyledCard $variant={variant} $padding={padding} className={className}>
      {children}
    </StyledCard>
  );
}
