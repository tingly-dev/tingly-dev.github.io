import { createTheme } from '@mui/material/styles';

// Extract colors from your CSS variables
const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(175 80% 50%)', // matches --primary from index.css
      dark: 'hsl(175 80% 45%)',
      light: 'hsl(175 80% 55%)',
      contrastText: 'hsl(220 20% 6%)', // matches --primary-foreground
    },
    background: {
      default: 'hsl(220 20% 6%)', // matches --background
      paper: 'hsl(220 18% 10%)', // matches --card
    },
    text: {
      primary: 'hsl(210 40% 98%)', // matches --foreground
      secondary: 'hsl(215 20% 55%)', // matches --muted-foreground
    },
    divider: 'hsl(220 15% 20%)', // matches --border
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem', // matches --radius
          padding: '0.75rem 2rem',
          gap: '0.5rem',
        },
        contained: {
          '&:hover': {
            backgroundColor: 'hsl(175 80% 45%)',
          },
        },
        outlined: {
          '&:hover': {
            borderColor: 'hsl(175 80% 45%)',
            backgroundColor: 'hsl(175 80% 10%)',
            color: 'hsl(175 80% 45%)',
          },
        },
      },
    },
  },
});

export default theme;