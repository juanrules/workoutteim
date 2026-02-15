// Button component styles converted from Button.scss
// Note: This file requires styled-components to be installed
// Usage: import { StyledButton } from './Button.styled';

import { theme } from '../theme';
import { media } from '../theme/media';

export const buttonStyles = `
  background: ${theme.colors.light};
  box-shadow: ${theme.shadows.button};
  border: none;
  border-radius: ${theme.borderRadius.small};
  transition: all 0.5s ease-in-out;
  padding: 0.7rem 1rem;
  color: ${theme.colors.main};
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize.base};

  .fas {
    display: inline-block;
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${theme.colors.accent};
  }

  &:first-child {
    margin-right: 1rem;
  }

  /* Primary variant */
  &.primary {
    background-color: ${theme.colors.accent};
    color: white;

    &:hover {
      color: white;
      background-color: ${theme.colors.main};
    }
  }

  /* Secondary variant */
  &.secondary {
    font-size: 1rem;
    background-color: ${theme.colors.main};
    color: white;

    &:hover {
      color: white;
    }
  }

  /* Icon-only variant */
  &.icon-only {
    border-radius: ${theme.borderRadius.large};
    width: 3rem;
    height: 3rem;
    line-height: 0;
    
    .fas {
      margin-right: 0;
    }
  }

  /* Link variant */
  &.link {
    background-color: transparent;
    box-shadow: none;
    font-family: ${theme.fonts.secondary};
    font-weight: 600;
  }
`;

// When styled-components is available, use:
// import styled from 'styled-components';
// export const StyledButton = styled.button`${buttonStyles}`;
