import styled from "styled-components";

const SkipLinkWrapper = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 0;
  font-weight: 600;
  font-size: 0.875rem;

  &:focus {
    top: 0;
    outline: 2px solid var(--color-primary-dark);
    outline-offset: 2px;
  }

  &:hover {
    background: var(--color-primary-dark);
  }
`;

export function SkipLink() {
  return (
    <SkipLinkWrapper href="#main-content">
      메인 콘텐츠로 이동
    </SkipLinkWrapper>
  );
}
