import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      white: '#FFFFFF',
      black: '#000000',
      blue: '#227C9D',
      green: '#17C3B2',
      yellow: '#ECC94B',
      cream: ' #FEF9EF',
      red: '#FE6D73',
      50: '#e9f2f5', 
      100: '#d3e5eb',
      150: '#bdd8e2',
      200: '#a7cbd8', 
      250: '#91bece', 
      300: '#7ab0c4', 
      350: '#64a3ba', 
      400: '#4e96b1', 
      450: '#3889a7', 
      500: '#227c9d', 
      550: '#1f708d', 
      600: '#1b637e', 
      650: '#18576e', 
      700: '#144a5e', 
      750: '#113e4f', 
      800: '#0e323f', 
      850: '#0a252f', 
      900: '#07191f',
      950: '#030c10'
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
        bg: 'brand.50',
        color: 'brand.800',
        height: "100vh",
      },
      header: {
        bg: 'brand.blue',
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
    },
    Heading: {
      baseStyle: {
        color: 'brand.600',
      },
      variants: {
        'light': {
          color: 'brand.white',
        },
        'product': {
          color: 'brand.700',
        },
      }
    },
    Button: {
      variants: {
        'primary': {
          bg: 'brand.500',
          color: 'brand.white',
          _hover: {
            bg: 'brand.600',
            boxShadow: '0 0 2px 2px #efdfde',
          },
          _active: {
            bg: 'brand.green',
          },
          _focus: {
            bg: 'brand.550',
            boxShadow: '0 0 2px 2px #efdfde',
          }
        },
        'secondary': {
          bg: 'brand.200',
          color: 'brand.black',
          border: '1px solid',
          borderColor: 'brand.300',
          _hover: {
            bg: 'brand.250',
            boxShadow: '0 0 2px 2px #efdfde',
          },
          _active: {
            bg: 'brand.300',
          },
          _focus: {
            bg: 'brand.250',
            boxShadow: '0 0 2px 2px #efdfde',
          }
        },
        'negative': {
          bg: 'brand.red',
          color: 'brand.white',
          _hover: {
            bg: 'brand.yellow',
            color: 'brand.black',
            boxShadow: '0 0 2px 2px #efdfde',
          },
          _active: {
            bg: 'brand.yellow',
            color: 'brand.black',
          },
          _focus: {
            bg: 'brand.yellow',
            color: 'brand.black',
            boxShadow: '0 0 2px 2px #efdfde',
          }
        },
      }
    }
  }
});

export default theme;