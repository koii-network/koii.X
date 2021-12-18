import { BrowserRouter } from "react-router-dom";
// routes
import { Routes } from "routes";
// providers
import { QueryClient, QueryClientProvider } from "react-query";
import { FinnieProvider } from "components/context/finnie";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryParamProvider } from "use-query-params";
// theme
import { theme } from "./theme";
// fonts
import "@fontsource/ibm-plex-sans";

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
              {/* Query Params */}
              <QueryParamProvider>
                <Routes />
              </QueryParamProvider>
            </BrowserRouter>
          </FinnieProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
