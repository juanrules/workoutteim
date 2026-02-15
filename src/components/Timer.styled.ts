// Timer component styles converted from Timer.scss
// Note: This file requires styled-components to be installed
// Usage: import { StyledTimer, TimerBody, TimerTime, etc. } from './Timer.styled';

import { theme } from '../theme';
import { media } from '../theme/media';
import { animations } from '../theme/animations';

export const timerStyles = `
  display: grid;
  grid-template-columns: auto 10rem;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.mainLight};
  border-top: 1px solid white;
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  position: relative;
  animation: fadeIn 0.5s ease-in-out forwards;

  ${media.sm} {
    grid-template-columns: auto 3rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  &:before {
    content: "";
    width: 10px;
    height: 10px;
    display: block;
    border: 3px solid ${theme.colors.accent};
    border-radius: 50%;
    color: ${theme.colors.accent};
    position: absolute;
    top: calc(50% - 1rem);
    background-color: ${theme.colors.light};
    z-index: 1;
  }

  &:after {
    content: "";
    width: 0px;
    height: 100%;
    display: block;
    border: 1px solid ${theme.colors.accent};
    color: ${theme.colors.accent};
    position: absolute;
    top: calc(50% - 1rem);
    left: 7px;
  }

  &:only-child,
  &:last-child {
    border-bottom: 1px solid ${theme.colors.mainLight};
    margin-bottom: 0;
    padding-bottom: ${theme.spacing.lg};

    ${media.sm} {
      padding-bottom: 1.5rem;
    }
  }

  &:only-child .Timer__remove {
    display: none;
  }

  &:last-child:after {
    display: none;
  }

  /* Active state */
  &.isActive:before {
    animation: 1s ease-in pulsingDot infinite;
    background-color: ${theme.colors.accent};
  }

  /* Inactive state */
  &.isInactive {
    filter: opacity(0.5);
  }

  &.isInactive .Timer__remove {
    display: none;
  }

  /* Rest interval state */
  &.isRestInvertal:before {
    border-top: 3px solid ${theme.colors.accent};
    border-radius: 0;
    border-bottom: 3px solid ${theme.colors.accent};
    border-left: 0;
    border-right: 0;
    height: 4px;
    width: 16px;
  }

  &.isRestInvertal:after {
    height: 111%;
  }

  &.isRestInvertal .Timer__time {
    font-size: ${theme.fontSize.xxl};
    width: 5.5rem;
    color: ${theme.colors.lightText};
  }

  &.isRestInvertal .Timer__title,
  &.isRestInvertal .Timer__title input[type="text"] {
    font-size: ${theme.fontSize.lg};
    color: ${theme.colors.lightText};
  }

  &.isRestInvertal .Timer__controls {
    color: ${theme.colors.lightText};
    font-size: 1.2rem;
  }

  &.isRestInvertal .Timer__controls:first-child {
    margin-bottom: 0.2rem;
  }

  &.isRestInvertal .Timer__controls:nth-child(2) {
    margin-top: 0.2rem;
  }

  &.isRestInvertal .Timer__remove {
    display: none;
  }
`;

export const timerBodyStyles = `
  padding-left: ${theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const timerTimeStyles = `
  font-size: ${theme.fontSize.xxxl};
  width: 8rem;

  ${media.sm} {
    font-size: ${theme.fontSize.xxl};
    width: 6rem;
  }
`;

export const timerControlsStyles = `
  display: flex;
  flex-direction: column;
  font-size: ${theme.fontSize.lg};
  justify-content: space-around;
  margin-left: 0.5rem;
  cursor: pointer;

  & > * {
    line-height: 0;
    transition: all ease-in-out 0.25s;

    &:hover {
      color: ${theme.colors.accent};
    }

    &:first-child {
      margin-bottom: 0.5rem;
    }

    &:nth-child(2) {
      margin-top: 0.5rem;
    }
  }
`;

export const timerInputStyles = `
  font-weight: 400;
  padding: 0;
  font-size: ${theme.fontSize.xl};
  text-transform: uppercase;
  letter-spacing: 0;
  display: block;
  color: var(--primary-color);
  background-color: transparent;
  border: none;
  display: inline-block;
  margin-bottom: 0.15rem;
  font-family: ${theme.fonts.primary};
  width: 100%;

  &::placeholder {
    color: var(--primary-color);
    opacity: 1;
  }

  &:focus::placeholder {
    color: ${theme.colors.lightText};
  }

  ${media.sm} {
    font-size: ${theme.fontSize.lg};
  }
`;

export const timerTitleStyles = `
  font-size: ${theme.fontSize.xl};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  width: 100%;

  ${media.sm} {
    font-size: ${theme.fontSize.lg};
  }
`;

export const timerEditActionStyles = `
  font-size: ${theme.fontSize.base};
  opacity: 0.5;
  margin-left: ${theme.spacing.sm};
  text-transform: none;
`;

export const timerActionsStyles = `
  text-align: right;
`;

export const timerRemoveStyles = `
  font-size: ${theme.fontSize.lg};

  ${media.sm} {
    font-size: ${theme.fontSize.base};
  }
`;

// Keyframes for pulsing dot animation
export const pulsingDotKeyframes = `
  0% {
    box-shadow: 0 0 0px rgba(255, 16, 132, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 16, 132, 1);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 16, 132, 0.8);
  }
`;

// When styled-components is available, use:
// import styled, { keyframes } from 'styled-components';
// 
// const pulsingDot = keyframes`${pulsingDotKeyframes}`;
// const fadeIn = keyframes`${animations.fadeIn}`;
// 
// export const StyledTimer = styled.div`${timerStyles}`;
// export const TimerBody = styled.div`${timerBodyStyles}`;
// export const TimerTime = styled.div`${timerTimeStyles}`;
// export const TimerControls = styled.div`${timerControlsStyles}`;
// export const TimerInput = styled.input`${timerInputStyles}`;
// export const TimerTitle = styled.div`${timerTitleStyles}`;
// export const TimerEditAction = styled.span`${timerEditActionStyles}`;
// export const TimerActions = styled.div`${timerActionsStyles}`;
// export const TimerRemove = styled.div`${timerRemoveStyles}`;
