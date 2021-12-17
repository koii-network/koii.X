import React from "react";
// ui
import { Flex } from "@chakra-ui/react";
import { Nav, Footer } from "components/common";

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
