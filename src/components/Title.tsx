import styled from "styled-components";

export const Title = styled.h1`
  ///* 공통 스타일 */
  margin: 0;
  color: var(--color-gray-900);

  ///* 태그나 props에 따른 조건부 스타일 */
  font-size: ${(props) =>
    props.as === "h2" ? "var(--font-size-xl)" : "var(--font-size-2xl)"};
  color: ${(props) =>
    props.as === "h2" ? "var(--color-blue-600)" : "var(--color-gray-900)"};
`;
