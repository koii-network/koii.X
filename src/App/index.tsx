import { BrowserRouter, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
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
              <QueryParamProvider ReactRouterRoute={Route}>
                <Routes />
              </QueryParamProvider>
            </BrowserRouter>
          </FinnieProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
