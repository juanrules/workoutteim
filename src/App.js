import React, { useReducer } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Toolbar from "./components/Toolbar";
import reducer from "./modules/reducer";
import initialState from "./constants/initialState";
import actionTypes from "./constants/actionTypes";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startTimer = (index) => {
    dispatch({ type: actionTypes.START_TIMER, index });
  };

  const addNewTimer = (timer) => {
    dispatch({
      type: actionTypes.ADD_NEW_TIMER,
      timer,
    });
  };
  const deleteTimer = async (index) => {
    await dispatch({
      type: actionTypes.DELETE_TIMER,
      index,
    });
  };
  const resetTime = (snapshot) => {
    dispatch({
      type: actionTypes.RESET_TIME,
      snapshot,
    });
  };

  const pauseTime = () => {
    dispatch({ type: actionTypes.PAUSE_TIME });
  };

  const addTime = (index, time) => {
    dispatch({ type: actionTypes.ADD_TIME, index, time });
  };

  const setTime = (index, time) => {
    dispatch({ type: actionTypes.SET_TIME, index, time });
  };

  const reduceTime = (index, time) => {
    dispatch({ type: actionTypes.REDUCE_TIME, index, time });
  };

  const takeSnapshop = (snapshot) => {
    dispatch({ type: actionTypes.TAKE_SNAPSHOT, snapshot });
  };

  return (
    <div className="App">
      <header className="Logo">
        <img src={logo} alt="This workout timer" />
      </header>

      <Toolbar className="Toolbar">
        {state.isRunning && (
          <Button
            cssClass=""
            callBack={() => {
              pauseTime();
            }}
          >
            <i className="fas fa-pause"></i> Pause
          </Button>
        )}

        {!state.isRunning && (
          <Button
            cssClass="primary"
            callBack={() => {
              startTimer(0);

              if (!state.snapshots.length) {
                takeSnapshop(state.timers);
              }
            }}
          >
            <i className="fas fa-play"></i> Start
          </Button>
        )}

        <Button
          cssClass=""
          callBack={() => {
            resetTime(
              state.snapshots.length
                ? state.snapshots[state.snapshots.length - 1]
                : initialState.timers
            );
          }}
        >
          <i className="fas fa-sync-alt"></i> Reset timers
        </Button>
      </Toolbar>

      <div className="box">
        <div>
          {state.timers &&
            state.timers.map((e, i) => (
              <Timer
                key={i}
                increaseTime={addTime}
                startTimer={startTimer}
                reduceTime={reduceTime}
                {...e}
                index={i}
                deleteTimer={deleteTimer}
                setTime={setTime}
                isRunning={state.isRunning}
              />
            ))}
        </div>

        {!state.isRunning && (
          <div className="box__actions">
            <Button
              cssClass="secondary"
              callBack={() => {
                addNewTimer({ title: "Exercise", time: 1, isActive: false });
              }}
            >
              <i className="fas fa-plus"></i> Add a timer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
