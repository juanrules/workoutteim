// Global styles converted from App.scss
// Note: This file requires styled-components to be installed
// Usage: import { GlobalStyles } from './styles/GlobalStyles'; then <GlobalStyles /> in your app

export const globalStyles = `
  :root {
    --main-color: #1044ff;
    --main-color-light: rgba(16, 68, 255, 0.2);
    --accent-color: #ff1084;
    --light-color: #f1f3ff;
    --shadow-color: rgb(198, 208, 255);
    --light-text: #9cabe8;
    --accent-secondary-color: #60ffa6;
    --lightest-color: #ffffff;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: "Barlow Condensed", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: var(--main-color);
    font-size: 16px;
    margin: 0;
    background-color: var(--light-color);
  }

  html {
    background-color: var(--light-color);
  }

  body,
  html,
  #root,
  .App {
    height: 100%;
  }

  .App {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  }

  button,
  input {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  a {
    color: var(--main-color);
  }

  iframe {
    border: 0;
  }

  .Logo {
    text-align: center;
    margin: 2rem 0 3rem;
  }

  .BottomToolbar {
    display: flex;
    justify-content: space-between;
  }

  .box {
    background: var(--light-color);
    box-shadow: -18px -18px 30px 0 var(--lightest-color),
      18px 18px 30px 0 var(--shadow-color);
    border-radius: 23px;
    padding: 0 3rem 3rem;
    max-width: 800px;
    margin-bottom: 1rem;
    position: relative;

    @media (max-width: 575.98px) {
      max-width: 100%;
      padding: 0 1rem 1rem;
    }

    &__actions {
      border-top: 1px solid white;
      text-align: center;
      padding-top: 2.5rem;
      position: relative;
      z-index: 1;
      
      @media (max-width: 575.98px) {
        padding-top: 1.5rem;
        padding-bottom: 1rem;
      }
    }

    &__timeUp {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      &:after {
        content: "Times up! 🎉";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(241, 243, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        font-size: 4rem;

        @media (max-width: 575.98px) {
          font-size: 2.5rem;
        }
      }
    }
  }
`;

// When styled-components is available, use:
// import styled, { createGlobalStyle } from 'styled-components';
// export const GlobalStyles = createGlobalStyle`${globalStyles}`;
