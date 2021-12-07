import React from "react";
import styled from "styled-components";
import { ThemeProps } from "theme";

interface LabelProps {
  children: React.ReactNode;
  [key: string]: any;
}

const StyledLabel = styled.label`
  /* Defaults  */
  display: block;
  color: ${({ theme }) => theme.colors.primary[5]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes["md"]};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const Label: React.FC<LabelProps> = ({ children, ...restProps }) => {
  return <StyledLabel {...restProps}>{children}</StyledLabel>;
};
