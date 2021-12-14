import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Fonts */
  @font-face {
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 100 900;
  font-display: optional;
  src: url(/fonts/ibm-plex-sans-var.woff2) format('woff2');
  }
  html, body {
    font-family: 'IBM Plex Sans', sans-serif;
    height: 100%;
  }
  #root {
    height: 100%;
  }
  /* Reset */
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .custom-scroll {
    & {
      /* width */
      &::-webkit-scrollbar {
        width: 6px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #F3F4F6;
        border-radius: 0px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #D1D5DB;
        border-radius: 0px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #064E3B;
      }
    }
  }
  .container {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
  }
`;
