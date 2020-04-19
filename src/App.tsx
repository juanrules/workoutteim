import React, { useReducer, useEffect, ReactElement } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Toolbar from "./components/Toolbar";
import reducer from "./modules/reducer";
import initialState from "./constants/initialState";
import actionTypes from "./constants/actionTypes";
import Menu from "./components/Menu";
import { iTimer } from "./types";
import Modal from "./components/Modal";
import { version } from "../package.json";
import Footer from "./components/Footer";

const finishLineAudio = require("./audio/OK_Hand _Sign.wav");

const App = (): ReactElement => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const startTimer = (index: number) => {
    dispatch({ type: actionTypes.START_TIMER, index });
  };

  const deleteTimers = async () => {
    dispatch({ type: actionTypes.DELETE_TIMERS });
  };

  const addNewTimer = (timer: iTimer) => {
    dispatch({
      type: actionTypes.ADD_NEW_TIMER,
      timer,
    });
  };

  const deleteTimer = async (index: number) => {
    await dispatch({
      type: actionTypes.DELETE_TIMER,
      index,
    });
  };
  const resetTime = async (snapshot: []) => {
    await dispatch({
      type: actionTypes.RESET_TIME,
      snapshot,
    });
  };

  const pauseTime = async () => {
    dispatch({ type: actionTypes.PAUSE_TIME });
  };

  const addTime = (index: number, time: number) => {
    dispatch({ type: actionTypes.ADD_TIME, index, time });
  };

  const setTime = (index: number, time: number) => {
    dispatch({ type: actionTypes.SET_TIME, index, time });
  };

  const reduceTime = (index: number, time: number) => {
    dispatch({ type: actionTypes.REDUCE_TIME, index, time });
  };

  const takeSnapshop = (snapshot: []) => {
    dispatch({ type: actionTypes.TAKE_SNAPSHOT, snapshot });
  };

  const setTimerTitle = (index: number, title: number) => {
    dispatch({ type: actionTypes.SET_TIMER_TITLE, index, title });
  };

  const showCredits = () => {
    dispatch({ type: actionTypes.SHOW_CREDITS });
  };

  const showHelp = () => {
    dispatch({ type: actionTypes.SHOW_HELP });
  };

  const audio = new Audio(finishLineAudio);

  useEffect(() => {
    if (state.timesUp) {
      audio.play();
    }
  }, [audio, state.timesUp]);

  return (
    <div
      className={`App ${
        state.showCredits | state.showHelp ? "modalIsActive" : ""
      }`}
    >
      <Menu isMenuActive={state.showCredits}>
        <Button cssClass="icon-only" callBack={() => showCredits()}>
          <i className="fas fa-info-circle" aria-label="Menu"></i>
        </Button>
      </Menu>
      <header className="Logo">
        <img src={logo} alt="This workout timer" />
      </header>
      <main>
        <Toolbar cssClass="Toolbar">
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
              state.timers.map((e: any, i: any) => (
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
                {state.placeholder.map((e: any, i: any) => (
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
                  addNewTimer({ time: 30, isActive: false });
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
        <div className="u-text-align-right">
          <Button cssClass="link" callBack={() => showHelp()}>
            How does this work?
          </Button>
        </div>
      </main>
      <Footer>
        Made with{" "}
        <span role="img" aria-label="time emoji">
          ⏰{" "}
        </span>{" "}
        by <a href="https://thisjuanpernia.com">this Juan</a>. // v{version}
      </Footer>
      {state.showHelp && (
        <Modal
          isActive={state.showHelp}
          toggleModal={showHelp}
          title="How does this work?"
        >
          <p>
            Use this website to build custom Workouts and Circuits. <br />{" "}
            Here's how it works:
          </p>

          <ol>
            <li>Use the "Add Timer" button to add intervals to the queue</li>
            <li>Use the arrows to increase or reduce the times</li>
            <li>
              Press the "Start" button and off you go{" "}
              <span role="img" aria-label="muscle emoji">
                💪
              </span>
            </li>
          </ol>
          <iframe
            title="Check out how the Workout Teim works ?"
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/jmShJvParIs"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Modal>
      )}
      {state.showCredits && (
        <Modal
          isActive={state.showCredits}
          toggleModal={showCredits}
          title="Workout timer"
        >
          <p>
            Hi, there{" "}
            <span role="img" aria-label="hello emoji">
              🙋🏻‍♂️
            </span>
          </p>
          <p>
            You are interacting with an application I put together to help my
            girlfriend and myself train at home during the Covid-19 lockdown.
          </p>
          <p>
            I had a lot of fun building it and I thought it'd be nice to publish
            it in case anyone else may find it useful.
          </p>
          <p>
            Feel free to say Hi or suggest any feedback by dropping me a line
            at:{" "}
            <a href="mailto:juan.pernia.n@gmail.com">juan.pernia.n@gmail.com</a>
          </p>
        </Modal>
      )}
    </div>
  );
};

export default App;
