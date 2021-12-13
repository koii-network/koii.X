import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "routes";
// providers
import { FinnieProvider } from "components/context/finnie";
// ui
import { ThemeProvider } from "styled-components";
import { theme } from "theme";
import { GlobalStyles } from "theme/GlobalStyles";

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <FinnieProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </FinnieProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
