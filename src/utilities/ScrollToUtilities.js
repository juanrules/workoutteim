/**
 * Created by Dale on 26/04/2019.
 */

export const scrollToElement = (ref, offset = 0) =>
  window.scrollTo({
    top: ref.current.offsetTop - offset,
    behavior: "smooth",
  });

/***
 * Bring the user to the top of the page, smoothly
 */
export const scrollTotop = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
