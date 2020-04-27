const INITAL_TIMERS_SET = [
  {
    time: 60,
    isActive: false,
  },
];

export default {
  isRunning: false,
  timers: INITAL_TIMERS_SET,
  snapshot: [INITAL_TIMERS_SET],
  placeholder: [],
  timesUp: false,
  showCredits: false,
  showHelp: false,
  restIntervalsToggle: false,
};
