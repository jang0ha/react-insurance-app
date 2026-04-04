import styled, { css } from "styled-components";
import { ButtonProps } from "../types";
import { focusRing, transition } from "../styles/common";

// Variant styles
const variantStyles = {
  primary: css`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }

    &:active:not(:disabled) {
      background-color: #1d4ed8;
    }
  `,
  secondary: css`
    background-color: ${(props) => props.theme.colors.gray[100]};
    color: ${(props) => props.theme.colors.gray[900]};
    border: 1px solid ${(props) => props.theme.colors.gray[300]};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.gray[200]};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.colors.gray[300]};
    }
  `,
  danger: css`
    background-color: ${(props) => props.theme.colors.danger};
    color: white;

    &:hover:not(:disabled) {
      background-color: #dc2626;
    }

    &:active:not(:disabled) {
      background-color: #b91c1c;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.gray[50]};
    }

    &:active:not(:disabled) {
      background-color: ${(props) => props.theme.colors.gray[100]};
    }
  `,
};

// Size styles
const sizeStyles = {
  sm: css`
    padding: ${(props) => props.theme.spacing.sm}
      ${(props) => props.theme.spacing.md};
    font-size: ${(props) => props.theme.typography.fontSize.sm};
    border-radius: ${(props) => props.theme.borderRadius.md};
  `,
  md: css`
    padding: ${(props) => props.theme.spacing.md}
      ${(props) => props.theme.spacing.lg};
    font-size: ${(props) => props.theme.typography.fontSize.base};
    border-radius: ${(props) => props.theme.borderRadius.lg};
  `,
  lg: css`
    padding: ${(props) => props.theme.spacing.lg}
      ${(props) => props.theme.spacing.xl};
    font-size: ${(props) => props.theme.typography.fontSize.lg};
    border-radius: ${(props) => props.theme.borderRadius.lg};
  `,
};

interface StyledButtonProps {
  $variant: ButtonProps["variant"];
  $size: ButtonProps["size"];
}

const StyledButton = styled.button<StyledButtonProps>`
  ${focusRing}
  ${transition("all")}

  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${(props) => variantStyles[props.$variant || "primary"]}
  ${(props) => sizeStyles[props.$size || "md"]}
`;

export function Button({
  variant = "primary",
  size = "md",
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} style={style} {...props}>
      {children}
    </StyledButton>
  );
}
