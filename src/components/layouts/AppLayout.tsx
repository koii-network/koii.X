import React from "react";
// ui
import { Flex } from "@chakra-ui/react";
import Nav from "components/Nav";
import Footer from "components/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Flex flexDir="column" minH="100%" w="100%">
      <Nav />
      {children}
      <Footer />
    </Flex>
  );
};
