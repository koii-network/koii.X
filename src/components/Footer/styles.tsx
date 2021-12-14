import styled from "styled-components";

export const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.colors.primary[5]};
  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[2]}`};
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
  }
`;
