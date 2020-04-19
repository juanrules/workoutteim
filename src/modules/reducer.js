import actionTypes from "../constants/actionTypes";
import * as constants from "../constants/main";
export default (state, action) => {
  switch (action.type) {
    case actionTypes.START_TIMER:
      // Reset the timers when they are all over
      if (!state.timers[action.index]) {
        return {
          ...state,
          isRunning: false,
          timers: [],
          placeholder: state.snapshots[state.snapshots.length - 1],
          timesUp: true,
        };
      }

      return {
        ...state,
        isRunning: true,
        timers: [
          ...state.timers.map((e, i) =>
            i === action.index
              ? { ...e, isActive: true }
              : { ...e, isActive: false }
          ),
        ],
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
            i === action.index ? { ...e, time: action.time } : { ...e }
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
        timers: action.snapshot,
        placeholder: [],
        timesUp: false,
        isRunning: false,
      };

    case actionTypes.ADD_NEW_TIMER:
      return {
        ...state,
        timers: [...state.timers, { ...action.timer }],
        snapshots: [...state.snapshots, [...state.timers, action.timer]],
      };

    case actionTypes.DELETE_TIMER:
      const filteredTimers = [
        ...state.timers.filter((_e, i) => i !== action.index),
      ];
      return {
        ...state,
        timers: filteredTimers,
        snapshots: [...state.snapshots, filteredTimers],
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
        snapshots: [...state.snapshots, newTitleTimers],
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
        snapshots: [...state.snapshots, addedTimeTimers],
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
        snapshots: [...state.snapshots, reducedTimeTimers],
      };

    case actionTypes.TAKE_SNAPSHOT:
      return {
        ...state,
        snapshots: [...state.snapshots, action.snapshot],
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

    default:
      return null;
  }
};
