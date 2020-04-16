import React, { useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Toolbar from "./components/Toolbar";
import reducer from "./modules/reducer";
import initialState from "./constants/initialState";
import actionTypes from "./constants/actionTypes";
import finishLineAudio from "./audio/OK Hand Sign.wav";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startTimer = (index) => {
    dispatch({ type: actionTypes.START_TIMER, index });
  };

  const deleteTimers = async () => {
    dispatch({ type: actionTypes.DELETE_TIMERS });
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
  const resetTime = async (snapshot) => {
    await dispatch({
      type: actionTypes.RESET_TIME,
      snapshot,
    });
  };

  const pauseTime = async () => {
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

  const setTimerTitle = (index, title) => {
    dispatch({ type: actionTypes.SET_TIMER_TITLE, index, title });
  };

  const audio = new Audio(finishLineAudio);

  useEffect(() => {
    if (state.timesUp) {
      audio.play();
    }
  }, [audio, state.timesUp]);

  return (
    <div className="App">
      <header className="Logo">
        <img src={logo} alt="This workout timer" />
      </header>

      <Toolbar className="Toolbar">
        <Button
          cssClass=""
          callBack={async () => {
            await deleteTimers();
            resetTime(
              state.snapshots.length
                ? state.snapshots[state.snapshots.length - 1]
                : initialState.timers
            );
          }}
        >
          <i className="fas fa-sync-alt"></i> Reset timers
        </Button>
        {state.isRunning && (
          <Button
            callBack={async () => {
              await pauseTime();
            }}
          >
            <i className="fas fa-pause"></i> Pause
          </Button>
        )}

        {!state.isRunning && !state.timesUp && (
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
                setTimerTitle={setTimerTitle}
              />
            ))}

          {state.placeholder.length > 0 && (
            <div className="box__timeUp">
              {state.placeholder.map((e, i) => (
                <Timer key={i} isPlaceholder={true} {...e} index={i} />
              ))}
            </div>
          )}
        </div>
        <div className="box__actions">
          {!state.isRunning && !state.timesUp && (
            <Button
              cssClass="secondary"
              callBack={() => {
                addNewTimer({ time: 1, isActive: false });
              }}
            >
              <i className="fas fa-plus"></i> Add a timer
            </Button>
          )}

          {!state.isRunning && state.timesUp && (
            <Button
              cssClass="primary"
              callBack={async () => {
                await deleteTimers();
                await resetTime(
                  state.snapshots.length
                    ? state.snapshots[state.snapshots.length - 1]
                    : initialState.timers
                );

                startTimer(0);
              }}
            >
              <i className="fas fa-play"></i> Go Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
