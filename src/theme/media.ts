import { theme } from './index';

// Responsive breakpoint utilities to replace SCSS @mixin respondTo
export const media = {
  sm: `@media (max-width: ${theme.breakpoints.sm})`,
  md: `@media (max-width: ${theme.breakpoints.md})`,
  lg: `@media (max-width: ${theme.breakpoints.lg})`,
  xl: `@media (max-width: ${theme.breakpoints.xl})`,
} as const;

// Helper function for custom breakpoints
export const mediaQuery = (maxWidth: string) => `@media (max-width: ${maxWidth})`;
