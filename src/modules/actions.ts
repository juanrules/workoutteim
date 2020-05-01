import actionTypes from "../constants/actionTypes";
import { iTimer } from "../types";

export const startTime = (dispatch: any) => {
  dispatch({ type: actionTypes.START_TIME });
};

export const pauseTime = (dispatch: any) => {
  dispatch({ type: actionTypes.PAUSE_TIME });
};

export const endTime = (dispatch: any) => {
  dispatch({ type: actionTypes.END_TIME });
};

export const addNewTimer = async (timer: iTimer, dispatch: any) => {
  dispatch({
    type: actionTypes.ADD_NEW_TIMER,
    timer,
  });
};

export const deleteTimer = async (index: number, dispatch: any) => {
  await dispatch({
    type: actionTypes.DELETE_TIMER,
    index,
  });
};

export const addTime = (index: number, dispatch: any) => {
  dispatch({ type: actionTypes.ADD_TIME, index });
};

export const reduceTime = (index: number, dispatch: any) => {
  dispatch({ type: actionTypes.REDUCE_TIME, index });
};

export const resetTime = async (dispatch: any) => {
  await dispatch({
    type: actionTypes.RESET_TIME,
  });
};

export const addRestIntervals = async (timer: iTimer, dispatch: any) => {
  dispatch({
    type: actionTypes.ADD_REST_INTERVALS,
    timer,
  });
};

export const removeRestIntervals = async (dispatch: any) => {
  dispatch({
    type: actionTypes.REMOVE_REST_INTERVALS,
  });
};

export const toggleRestIntervals = async (toggle: boolean, dispatch: any) => {
  dispatch({
    type: actionTypes.TOGGLE_REST_INTERVALS,
    toggle,
  });
};

export const setTime = (index: number, time: number, dispatch: any) => {
  dispatch({ type: actionTypes.SET_TIME, index, time });
};
export const setWorkout = (workout: [], dispatch: any) => {
  dispatch({ type: actionTypes.SET_WORKOUT, workout });
};

export const takeSnapshop = async (snapshot: [], dispatch: any) => {
  dispatch({ type: actionTypes.TAKE_SNAPSHOT, snapshot });
};

export const setTimerTitle = (index: number, title: string, dispatch: any) => {
  dispatch({ type: actionTypes.SET_TIMER_TITLE, index, title });
};

export const showCredits = (dispatch: any) => {
  dispatch({ type: actionTypes.SHOW_CREDITS });
};

export const showHelp = (dispatch: any) => {
  dispatch({ type: actionTypes.SHOW_HELP });
};

export const showShareModal = (dispatch: any) => {
  dispatch({ type: actionTypes.SHOW_SHARE_MODAL });
};

export const setWorkoutShortUrl = (url: string, dispatch: any) => {
  dispatch({ type: actionTypes.SET_WORKOUT_SHORT_URL, url });
};
