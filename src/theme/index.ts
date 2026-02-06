import { createTheme } from "@mui/material/styles";

// Theme colors extracted from CSS variables and custom colors
const themeColors = {
  // Background colors - white for light theme
  background: '#ffffff',
  foreground: '#1e293b',

  // Card colors - light gray
  card: '#f8fafc',
  cardForeground: '#1e293b',

  // Popover colors - white
  popover: '#ffffff',
  popoverForeground: '#1e293b',

  // Primary colors - blue (matching tingly-box)
  primary: {
    main: '#2563eb', // Blue-600
    light: '#3b82f6', // Blue-500
    dark: '#1d4ed8', // Blue-700
    contrastText: '#ffffff',
  },

  // Secondary colors - slate
  secondary: {
    main: '#64748b', // Slate-500
    light: '#94a3b8', // Slate-400
    dark: '#475569', // Slate-600
    contrastText: '#ffffff',
  },

  // Accent colors - indigo for variety
  accent: {
    main: '#6366f1', // Indigo-500
    contrastText: '#ffffff',
  },

  // Muted colors - gray text
  muted: '#f1f5f9',
  mutedForeground: '#64748b',

  // Destructive colors
  destructive: {
    main: '#ef4444', // Red-500
    light: '#f87171',
    dark: '#dc2626',
    contrastText: '#ffffff',
  },

  // Border colors - subtle
  border: '#e2e8f0',
  input: '#d1d5db',

  // Other colors - blue glow
  glow: '#3b82f6',
  ring: '#2563eb',

  // Radius
  radius: 8, // 0.5rem for consistency with tingly-box
};

// Create the MUI theme
const baseTheme = createTheme({
  palette: {
    mode: 'light',
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
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b', // amber-500
      light: '#fbbf24',
      dark: '#d97706',
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
    '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px 0px rgba(0, 0, 0, 0.06), 0px 1px 2px -1px rgba(0, 0, 0, 0.04)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.06), 0px 2px 4px -2px rgba(0, 0, 0, 0.04)',
    '0px 6px 8px -2px rgba(0, 0, 0, 0.07), 0px 3px 6px -2px rgba(0, 0, 0, 0.04)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.04)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.08), 0px 8px 10px -4px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(37, 99, 235, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
  ],

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '6px',
          transition: 'all 0.2s ease-in-out',
          gap: '0.5rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          padding: '0.625rem 1.25rem',
          '&:hover': {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#374151',
          padding: '0.625rem 1.25rem',
          '&:hover': {
            borderColor: '#9ca3af',
            backgroundColor: '#f9fafb',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.card,
          border: `1px solid ${themeColors.border}`,
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderColor: 'rgba(37, 99, 235, 0.3)',
            transform: 'translateY(-2px)',
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
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          maxWidth: '300px',
          fontWeight: 400,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
            color: themeColors.primary.dark,
            textDecoration: 'underline',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: themeColors.primary.main,
              borderWidth: '1px',
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
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.06), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)',
        },
        elevation3: {
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.06), 0px 2px 4px -1px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },

});

// Export the theme
export const theme = {
  ...baseTheme,
  custom: {
    glow: `0 0 20px rgba(37, 99, 235, 0.15), 0 0 40px rgba(37, 99, 235, 0.08)`,
    textGlow: `0 0 20px rgba(37, 99, 235, 0.2), 0 0 40px rgba(37, 99, 235, 0.1)`,
    gradientBorder: `linear-gradient(white, white) padding-box,
                     linear-gradient(135deg, #2563eb, #3b82f6) border-box`,
  },
};

// Export theme colors for use in components
export const colors = themeColors;

// Component utility styles
export const componentStyles = {
  // Section headers
  sectionHeader: "text-[10px] uppercase tracking-widest font-bold",
  sectionHeaderCyan: "text-cyan-400",
  sectionHeaderBlue: "text-blue-400",
  sectionHeaderMuted: "text-muted-foreground",

  // Status indicator
  statusIndicator: {
    container: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500/80",
    pulse: "flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse",
  },

  // URL display
  urlDisplay: "text-xs sm:text-sm text-cyan-400 font-mono break-all block bg-black/40 p-3 rounded-lg border border-cyan-500/20",

  // Image with overlay
  imageWithOverlay: {
    container: "relative group overflow-hidden rounded-lg border border-white/10 bg-black/20",
    image: "opacity-80 group-hover:opacity-100 transition-opacity duration-300",
    overlay: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3",
    overlayText: "text-[11px] text-white/70 flex items-center gap-2",
  },

  // Info box
  infoBox: {
    container: "flex gap-3 bg-white/5 p-3 rounded-lg",
    icon: "text-cyan-400 shrink-0",
    text: "text-xs text-muted-foreground leading-relaxed",
  },

  // Link box
  linkBox: {
    container: "space-y-3 p-3 sm:p-4 bg-secondary/20 rounded-lg border border-white/5",
    url: "text-xs sm:text-sm text-cyan-400 font-mono break-all block bg-black/20 p-2 rounded",
    note: "text-xs text-muted-foreground italic",
  },
};

// Export types and hook
export * from "./types";
export { useTheme } from "./use-theme";

export default theme;