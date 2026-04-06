import { css } from 'styled-components';
import { Theme } from './theme';

// Media Query Helpers
export const media = {
  xs: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.xs}) {
        ${styles}
      }
    `,
  sm: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.sm}) {
        ${styles}
      }
    `,
  md: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.md}) {
        ${styles}
      }
    `,
  lg: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.lg}) {
        ${styles}
      }
    `,
  xl: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.xl}) {
        ${styles}
      }
    `,
};

// Flex Helpers
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

// Text Truncation
export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const multilineEllipsis = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Focus Styles (for accessibility)
export const focusRing = css`
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-visible {
    outline: 2px solid;
    outline-color: currentColor;
  }
`;

// Transition Helper
export const transition = (property: string = 'all', duration: string = '300ms') =>
  css`
    transition: ${property} ${duration} ease-in-out;
  `;
