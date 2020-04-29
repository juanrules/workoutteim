import actionTypes from "../constants/actionTypes";
import * as constants from "../constants/main";
export default (state, action) => {
  switch (action.type) {
    case actionTypes.START_TIME:
      return {
        ...state,
        isRunning: true,
      };

    case actionTypes.END_TIME:
      return {
        ...state,
        isRunning: false,
        timesUp: true,
        timers: [...state.timers.map((e) => ({ ...e, isActive: false }))],
      };

    case actionTypes.PAUSE_TIME:
      return {
        ...state,
        isRunning: false,
        timers: [...state.timers.map((e) => ({ ...e, isActive: false }))],
      };

    case actionTypes.SET_TIME:
      return {
        ...state,
        timers: [
          ...state.timers.map((e, i) =>
            i === action.index
              ? { ...e, time: action.time, isActive: true }
              : { ...e }
          ),
        ],
      };

    case actionTypes.DELETE_TIMERS:
      return {
        ...state,
        timers: [],
      };

    case actionTypes.RESET_TIME:
      return {
        ...state,
        placeholder: [],
        timesUp: false,
        isRunning: false,
        timers: state.snapshot,
        snapshot: [],
      };

    case actionTypes.SET_WORKOUT:
      return {
        ...state,
        timers: action.workout,
      };

    case actionTypes.ADD_NEW_TIMER:
      const newTimer = state.restIntervalsToggle
        ? [constants.DEFAULT_REST_INTERVAL, action.timer]
        : [action.timer];

      return {
        ...state,
        timers: [...state.timers, ...newTimer],
        snapshot: [],
      };

    case actionTypes.ADD_REST_INTERVALS:
      const timersPlusIntervals = [
        ...state.timers.reduce((acc, e) => acc.concat(e, action.timer), []),
      ];

      timersPlusIntervals.pop();

      return {
        ...state,
        timers: timersPlusIntervals,
        restIntervalsToggle: true,
        snapshot: [],
      };

    case actionTypes.REMOVE_REST_INTERVALS:
      return {
        ...state,
        timers: [...state.timers.filter((e, i) => !e.isRestInvertal)],
        restIntervalsToggle: false,
        snapshot: [],
      };

    case actionTypes.DELETE_TIMER:
      const filteredTimers = [
        ...state.timers.filter(
          (e, i) =>
            i !== action.index && !(i === action.index + 1 && e.isRestInvertal)
        ),
      ];

      return {
        ...state,
        timers: filteredTimers,
        snapshot: [],
      };

    case actionTypes.SET_TIMER_TITLE:
      const newTitleTimers = [
        ...state.timers.map((e, i) =>
          i === action.index ? { ...e, title: action.title } : { ...e }
        ),
      ];

      return {
        ...state,
        timers: newTitleTimers,
        snapshot: [],
      };

    case actionTypes.ADD_TIME:
      const addedTimeTimers = [
        ...state.timers.map((e, i) =>
          i === action.index
            ? { ...e, time: e.time + constants.TIME_INCREMENT }
            : { ...e }
        ),
      ];

      return {
        ...state,
        timers: addedTimeTimers,
        snapshot: [],
      };

    case actionTypes.REDUCE_TIME:
      const reducedTimeTimers = [
        ...state.timers.map((e, i) =>
          i === action.index
            ? {
                ...e,
                time:
                  e.time - constants.TIME_INCREMENT < 0
                    ? 1
                    : e.time - constants.TIME_INCREMENT,
              }
            : { ...e }
        ),
      ];

      return {
        ...state,
        timers: reducedTimeTimers,
        snapshot: [],
      };

    case actionTypes.TAKE_SNAPSHOT:
      return {
        ...state,
        snapshot: action.snapshot,
      };

    case actionTypes.SHOW_CREDITS:
      return {
        ...state,
        showCredits: !state.showCredits,
      };

    case actionTypes.SHOW_HELP:
      return {
        ...state,
        showHelp: !state.showHelp,
      };

    case actionTypes.SHOW_SHARE_MODAL:
      return {
        ...state,
        showShareModal: !state.showShareModal,
      };

    default:
      return null;
  }
};
