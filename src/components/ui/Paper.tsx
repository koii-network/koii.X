import { ReactNode } from "react";
import styled from "styled-components";

interface PaperProps {
  bg?: string;
  color?: string;
  p?: string;
  m?: string;
  spacing?: string;
  children: ReactNode;
}

export const PaperWrapper = styled.div.withConfig({
  shouldForwardProp: prop => !["bg", "color", "p", "m"].includes(prop)
})<PaperProps>`
  padding: ${({ theme, p }) => p || theme.space[2]};
  margin: ${({ m }) => m || "0"};
  background-color: ${({ theme, bg }) => (bg ? bg : theme.colors.gray[1])};
  color: ${({ theme, color }) => (color ? color : theme.colors.primary[5])};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: ${({ theme }) => theme.space[1]};
  font-weight: 500;
  & > *:not(:first-child) {
    margin-top: ${({ spacing }) => (spacing ? spacing : "unset")};
  }
`;

export const Paper: React.FC<PaperProps> = ({ bg, color, p, m, spacing, children }) => {
  return (
    <PaperWrapper bg={bg} color={color} p={p} m={m} spacing={spacing}>
      {children}
    </PaperWrapper>
  );
};
