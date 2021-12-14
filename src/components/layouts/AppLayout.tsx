import React from "react";
import styled from "styled-components";
// ui
import Nav from "components/Nav";
import Footer from "components/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Main>
      <Nav />
      {children}
      <Footer />
    </Main>
  );
};
const Main = styled.main`
  height: 100%;
  width: 100%;
`;
