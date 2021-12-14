import styled from "styled-components";

export const NavWrapper = styled.div`
  background: ${({ theme }) => theme.colors.primary[5]};
  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
  }
`;
