export const timeDiff = (target: number, clientStart: number) => {
  var timeDiff = target - performance.now() + clientStart;
  var minutes = ((timeDiff % 3.6e6) / 6e4) | 0;
  var seconds = ((timeDiff % 6e4) / 1e3) | 0;
  if (minutes < 0 || seconds < 0) {
    return false;
  } else {
    return {
      minutes: minutes,
      seconds: seconds,
    };
  }
};

export const addZero = (figure: number): string =>
  (figure < 10 ? "0" : "") + figure;

export const calculateMins = (time: number) =>
  addZero(Math.floor((time % 3600) / 60));

export const calculateSeconds = (time: number) => addZero(time % 60);
