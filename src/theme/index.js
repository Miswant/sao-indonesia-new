import { createTheme } from '@mui/material/styles';

// Sneat Theme Configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9155FD',
      light: '#A177FE',
      dark: '#7C3AED',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8A8D93',
      light: '#9B9FA5',
      dark: '#777B82',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#4C4E64',
      secondary: '#8A8D93',
    },
  },
  typography: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      color: '#384551',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      color: '#384551',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#384551',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#384551',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: '#384551',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#384551',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#8592a3',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#8592a3',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.375rem',
          fontWeight: 500,
          padding: '0.625rem 1.5rem',
        },
        contained: {
          boxShadow: '0 2px 4px 0 rgba(105, 108, 255, 0.4)',
          '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(105, 108, 255, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
          border: '1px solid #e7eaf0',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;