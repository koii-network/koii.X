import { extendTheme } from '@chakra-ui/react';
import { Component } from 'react';

// Let's say you want to add custom colors
const chakraTheme = extendTheme({
  // Colors
  colors: {
    brand: {
      '50': '#F4F4FC',
      '100': '#D2D2F3',
      '200': '#8E8EE0',
      '300': '#4A4ACD',
      '400': '#2A2A97',
      '500': '#171753',
      '600': '#131343',
      '700': '#0E0E33',
      '800': '#0A0A23',
      '900': '#050513'
    },
    secondary: {
      '50': '#CFFAF5',
      '100': '#B5F7F0',
      '200': '#83F2E5',
      '300': '#50ECDB',
      '400': '#1EE7D0',
      '500': '#14B8A6',
      '600': '#0F8A7C',
      '700': '#0A5C53',
      '800': '#052E2A',
      '900': '#000000'
    },
    // brand: {
    //   '50': '#000000',
    //   '100': '#000',
    //   '200': '#000',
    //   '300': '#000',
    //   '400': '#000',
    //   '500': '#000',
    //   '600': '#000',
    //   '700': '#000',
    //   '800': '#000',
    //   '900': '#000'
    // },
    // secondary: {
    //   '50': '#FEF6E7',
    //   '100': '#FDECCF',
    //   '200': '#FBD89E',
    //   '300': '#F9C56D',
    //   '400': '#F7B13C',
    //   '500': '#F59E0B',
    //   '600': '#C57F08',
    //   '700': '#945F06',
    //   '800': '#634004',
    //   '900': '#322002'
    // },

    blue: {
      900: '#1E3A8A',
      800: '#1E40AF',
      700: '#1D4ED8',
      600: '#2563EB',
      500: '#3B82F6',
      400: '#60A5FA',
      300: '#93C5FD',
      200: '#BFDBFE',
      100: '#DBEAFE',
      50: '#EFF6FF'
    },
    gray: {
      '50': '#FAFAFA',
      '100': '#F4F4F5',
      '200': '#E4E4E7',
      '300': '#D4D4D8',
      '400': '#A1A1AA',
      '500': '#71717A',
      '600': '#52525B',
      '700': '#3F3F46',
      '800': '#27272A',
      '900': '#18181B'
    },
    white: {
      500: '#fff'
    }
  },
  fonts: {
    body: 'Inter, sans-serif',
    display: 'Inter, sans-serif'
  },

  // Components
  components: {
    // Form
    Input: {
      defaultProps: {
        variant: 'filled',
        color: 'brand.500'
      },
      variants: {
        filled: {
          field: {
            bg: 'white',
            color: 'brand.500',
            _hover: { bg: 'white' },
            _focus: { bg: 'white' }
          }
        }
      }
    },
    // Modals
    Modal: {
      baseStyle: {
        header: {
          textAlign: 'center',
          fontSize: '22px'
        },
        footer: {
          justifyContent: 'center'
        },
        closeButton: {
          borderRadius: 'full',
          boxSize: '30px',
          _focus: {}
        }
      }
    }
  }
});
export default chakraTheme;
