// Theme system converted from CSS custom properties
export const theme = {
  colors: {
    main: '#1044ff',
    mainLight: 'rgba(16, 68, 255, 0.2)',
    accent: '#ff1084',
    light: '#f1f3ff',
    shadow: 'rgb(198, 208, 255)',
    lightText: '#9cabe8',
    accentSecondary: '#60ffa6',
    lightest: '#ffffff',
  },
  breakpoints: {
    sm: '575.98px',
    md: '767.98px',
    lg: '991.98px',
    xl: '1199.98px',
  },
  fonts: {
    primary: '"Barlow Condensed", sans-serif',
    secondary: '"Barlow", sans-serif',
  },
  shadows: {
    neumorphism: '-18px -18px 30px 0 #ffffff, 18px 18px 30px 0 rgb(198, 208, 255)',
    button: '-10px -10px 12px 0 #ffffff, 10px 10px 12px 0 rgb(198, 208, 255)',
  },
  borderRadius: {
    small: '0.5rem',
    medium: '23px',
    large: '100%',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  fontSize: {
    base: '1rem',
    lg: '1.5rem',
    xl: '2.25rem',
    xxl: '3rem',
    xxxl: '4.125rem',
  },
} as const;

export type Theme = typeof theme;
