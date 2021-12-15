import { BrowserRouter } from "react-router-dom";
// routes
import { Routes } from "routes";
// providers
import { QueryClient, QueryClientProvider } from "react-query";
import { FinnieProvider } from "components/context/finnie";
import { ChakraProvider } from "@chakra-ui/react";
// theme
import { theme } from "./theme";
// fonts
import "@fontsource/ibm-plex-sans";

/**
 *
 * @returns a query client
 * a query client is a wrapper around the fetch api
 * In this component we will return the routes that we want to use
 * and use it only as a <Routes/> component
 */

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      {/* Theme (Chakra UI) */}
      <ChakraProvider theme={theme}>
        {/* React Query Provider */}
        <QueryClientProvider client={queryClient}>
          {/* Finnie Provider */}
          <FinnieProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </FinnieProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
