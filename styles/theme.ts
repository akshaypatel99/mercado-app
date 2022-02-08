import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      white: '#FFFFFF',
      black: '#36363D',
      beige: ' #FDD5C0',
      pink: '#FB8289',
      red: '#F46161',
      orange: '#F89D5B',
      yellow: '#FFCF62',
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
    logo: 'Oleo Script',
    heading: 'Rambla',
    body: 'Martel Sans',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.white',
        color: 'brand.black',
        height: "100vh",
      },
      header: {
        bg: 'brand.red',
        color: 'brand.white',
        padding: '1rem 0',
      },
      nav: {
        fontFamily: 'heading',
        fontSize: '1.4rem',
        fontWeight: 'bold',
      }
    }
  }
});

export default theme;