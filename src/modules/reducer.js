import actionTypes from "../constants/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case actionTypes.START_TIMER:
      // Reset the timers when they are all over
      if (!state.timers[action.index]) {
        return {
          ...state,
          isRunning: false,
          timers: state.snapshots[state.snapshots.length - 1],
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

    case actionTypes.RESET_TIME:
      return {
        ...state,
        timers: action.snapshot,
      };

    case actionTypes.ADD_NEW_TIMER:
      return {
        ...state,
        timers: [...state.timers, { ...action.timer }],
        snapshots: [...state.snapshots, [...state.timers, action.timer]],
      };

    case actionTypes.DELETE_TIMER:
      return {
        ...state,
        timers: [...state.timers.filter((_e, i) => i !== action.index)],
      };

    case actionTypes.ADD_TIME:
      return {
        ...state,
        timers: [
          ...state.timers.map((e, i) =>
            i === action.index ? { ...e, time: e.time + 15 } : { ...e }
          ),
        ],
      };
    case actionTypes.REDUCE_TIME:
      return {
        ...state,
        timers: [
          ...state.timers.map((e, i) =>
            i === action.index ? { ...e, time: e.time - 15 } : { ...e }
          ),
        ],
      };

    case actionTypes.TAKE_SNAPSHOT:
      return {
        ...state,
        snapshots: [...state.snapshots, action.snapshot],
      };

    default:
      return null;
  }
};
