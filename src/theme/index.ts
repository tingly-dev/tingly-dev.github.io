import { createTheme } from "@mui/material/styles";

// Helper function to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return `rgb(${r}, ${g}, ${b})`;
};

// Helper function to convert HSL to Hex
const hslToHex = (h: number, s: number, l: number): string => {
  const [r, g, b] = hslToRgb(h, s, l).match(/\d+/g)!.map(Number);
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

// Theme colors extracted from CSS variables
const themeColors = {
  // Background colors
  background: hslToRgb(220, 20, 6),
  foreground: hslToRgb(210, 40, 98),

  // Card colors
  card: hslToRgb(220, 18, 10),
  cardForeground: hslToRgb(210, 40, 98),

  // Popover colors
  popover: hslToRgb(220, 18, 10),
  popoverForeground: hslToRgb(210, 40, 98),

  // Primary colors
  primary: {
    main: hslToHex(175, 80, 50),
    light: hslToHex(175, 80, 60),
    dark: hslToHex(175, 80, 40),
    contrastText: hslToRgb(220, 20, 6),
  },

  // Secondary colors
  secondary: {
    main: hslToHex(220, 15, 15),
    light: hslToHex(220, 15, 20),
    dark: hslToHex(220, 15, 10),
    contrastText: hslToRgb(210, 40, 98),
  },

  // Muted colors
  muted: hslToRgb(220, 15, 15),
  mutedForeground: hslToRgb(215, 20, 55),

  // Accent colors
  accent: {
    main: hslToHex(175, 80, 50),
    contrastText: hslToRgb(220, 20, 6),
  },

  // Destructive colors
  destructive: {
    main: hslToHex(0, 84.2, 60.2),
    light: hslToHex(0, 84.2, 70),
    dark: hslToHex(0, 84.2, 50),
    contrastText: hslToRgb(210, 40, 98),
  },

  // Border colors
  border: hslToRgb(220, 15, 20),
  input: hslToRgb(220, 15, 20),

  // Other colors
  glow: hslToHex(175, 80, 50),
  ring: hslToHex(175, 80, 50),

  // Radius
  radius: 8, // 0.5rem = 8px
};

// Create the MUI theme
const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: themeColors.background,
      paper: themeColors.card,
    },
    text: {
      primary: themeColors.foreground,
      secondary: themeColors.mutedForeground,
    },
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    info: {
      main: themeColors.accent.main,
      contrastText: themeColors.accent.contrastText,
    },
    success: {
      main: '#10b981', // emerald-500
    },
    warning: {
      main: '#f59e0b', // amber-500
    },
    error: themeColors.destructive,
    divider: themeColors.border,
  },

  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: themeColors.radius,
  },

  shadows: [
    'none',
    `0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)`,
    `0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)`,
    `0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)`,
    `0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)`,
    `0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)`,
    `0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)`,
    `0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)`,
    `0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    // Add custom glow shadow
    `0 0 20px ${themeColors.glow}33, 0 0 40px ${themeColors.glow}1a`,
    // Custom card shadow
    `0px 4px 6px -1px rgba(0,0,0,0.3),0px 2px 4px -1px rgba(0,0,0,0.2)`,
    // Additional shadows to match MUI's 24 array length
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
    `0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)`,
  ],

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '0.375rem',
          transition: 'all 0.2s ease-in-out',
          gap: '0.5rem',
        },
        contained: {
          background: `linear-gradient(135deg, ${themeColors.primary.main}, ${themeColors.primary.dark})`,
          '&:hover': {
            background: `linear-gradient(135deg, ${themeColors.primary.light}, ${themeColors.primary.main})`,
            transform: 'translateY(-1px)',
            boxShadow: `0 4px 8px -2px ${themeColors.primary.main}40`,
          },
        },
        outlined: {
          borderColor: themeColors.border,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: themeColors.primary.main,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.card,
          border: `1px solid ${themeColors.border}`,
          borderRadius: '0.5rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: `0 4px 12px ${themeColors.primary.main}20`,
            borderColor: themeColors.primary.main,
          },
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: themeColors.popover,
          color: themeColors.popoverForeground,
          border: `1px solid ${themeColors.border}`,
          fontSize: '0.875rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '0.375rem',
          maxWidth: '300px',
          fontWeight: 400,
          boxShadow: 'var(--shadow)',
        },
        arrow: {
          color: themeColors.popover,
          '&::before': {
            border: `1px solid ${themeColors.border}`,
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: themeColors.primary.main,
          textDecoration: 'none',
          '&:hover': {
            color: themeColors.primary.light,
            textDecoration: 'underline',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            '&:hover fieldset': {
              borderColor: themeColors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: themeColors.primary.main,
              borderWidth: '2px',
            },
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        },
        elevation2: {
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        },
        elevation3: {
          boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
        },
      },
    },
  },

});

// Export the theme
export const theme = {
  ...baseTheme,
  custom: {
    glow: `0 0 20px ${themeColors.glow}33, 0 0 40px ${themeColors.glow}1a`,
    textGlow: `0 0 20px ${themeColors.glow}50, 0 0 40px ${themeColors.glow}30`,
    gradientBorder: `linear-gradient(${themeColors.background}, ${themeColors.background}) padding-box,
                     linear-gradient(135deg, ${themeColors.primary.main}, ${themeColors.primary.main}4d) border-box`,
  },
};

// Export theme colors for use in components
export const colors = themeColors;

// Export types and hook
export * from "./types";
export { useTheme } from "./use-theme";

export default theme;