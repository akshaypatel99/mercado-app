import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      white: '#FFFFFF',
      black: '#000000',
      teal: '#227C9D',
      green: '#17C3B2',
      yellow: '#FFCB77',
      cream: ' #FEF9EF',
      red: '#FE6D73',
      50: '#fef7f7', 
      100: '#feefef',
      150: '#FDE4E4',
      200: '#fcd8d8', 
      300: '#fbc0c0', 
      400: '#f79090', 
      500: '#f46161', 
      600: '#dc5757', 
      700: '#b74949', 
      800: '#923a3a', 
      900: '#783030'
    }
  },
  fonts: {
    logo: 'Inter',
    heading: 'Inter',
    body: 'Inter',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.white',
        color: 'brand.black',
        height: "100vh",
      },
      header: {
        bg: 'brand.teal',
        color: 'brand.white',
        padding: '1rem 0',
      },
      button: {
        alignItems: 'center',
      },
      input: {
        alignItems: 'center',
        lineHeight: '1',
        paddingTop: '0.25rem',
      },
      a: {
        _hover: {
          textDecoration: 'none',
        }
      }
    }
  },
  components: {
    Link: {
      _hover: {
        textDecoration: 'none',
      }
    }
  }
});

export default theme;