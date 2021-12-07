import React from "react";
import styled from "styled-components";
import { ThemeProps } from "theme";

interface InputProps extends ThemeProps {
  children: React.ReactNode;
  [key: string]: any;
}

const StyledInput = styled.input`
  /* Defaults  */
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary[5]};
  border-radius: ${({ theme }) => theme.rounded[0.5]};
  font-family: ${({ theme }) => theme.fonts.body};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  font-size: ${({ theme }) => theme.fontSizes["md"]};
  font-weight: 500;
  text-decoration: none;
  outline: none;
  border: ${({ theme }) => `1px solid ${theme.colors.primary[5]}`};
  &:focus,
  &:active {
    box-shadow: 0 0 0 3px rgba(34, 34, 123, 0.5);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ children, ...restProps }, ref) => {
  return (
    <StyledInput ref={ref} {...restProps}>
      {children}
    </StyledInput>
  );
});
