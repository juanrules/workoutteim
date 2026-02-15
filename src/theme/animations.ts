// Animation keyframes converted from SCSS
// Note: These will need styled-components keyframes helper when used
// Usage: const animation = keyframes`${animations.fadeIn}`;

export const animations = {
  scaleDownEffect: `
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.7);
    }
  `,
  
  slideDown: `
    0% {
      transform: translateY(-100px);
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  `,
  
  fadeIn: `
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  `,
  
  pulsingDot: `
    0% {
      box-shadow: 0 0 0px rgba(255, 16, 132, 0.8);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 16, 132, 1);
    }
    100% {
      box-shadow: 0 0 0px rgba(255, 16, 132, 0.8);
    }
  `,
} as const;

export type AnimationName = keyof typeof animations;
