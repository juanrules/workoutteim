import React, { useReducer, useEffect, ReactElement } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Toolbar from "./components/Toolbar";
import reducer from "./modules/reducer";
import initialState from "./constants/initialState";
import { iTimer } from "./types";
import {
  DEFAULT_NEW_TIME_OBJECT,
  DEFAULT_REST_INTERVAL,
} from "./constants/main";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import { version } from "../package.json";
import Footer from "./components/Footer";
import ToggleSwitch from "./components/ToggleSwitch";
import * as actions from "./modules/actions";
import CopiableBox from "./components/CopiableBox";
import { db } from "./modules/db";
import { generateUniqueId } from "./utilities/strings";

const finishLineAudio = require("./audio/OK_Hand _Sign.wav");
const tickAudio = require("./audio/notification_simple-01.wav");
const partialFininshAudio = require("./audio/notification_high-intensity.wav");

const App = (): ReactElement => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const startTime = () => actions.startTime(dispatch);
  const pauseTime = () => actions.pauseTime(dispatch);
  const endTime = () => actions.endTime(dispatch);
  const addNewTimer = (timer: iTimer) => actions.addNewTimer(timer, dispatch);
  const deleteTimer = async (index: number) => {
    actions.deleteTimer(index, dispatch);
  };
  const addTime = (index: number) => actions.addTime(index, dispatch);
  const setTime = (index: number, time: number) =>
    actions.setTime(index, time, dispatch);
  const reduceTime = (index: number) => actions.reduceTime(index, dispatch);
  const resetTime = () => actions.resetTime(dispatch);
  const addRestIntervals = (timer: iTimer) =>
    actions.addRestIntervals(timer, dispatch);
  const removeRestIntervals = async () => {
    actions.removeRestIntervals(dispatch);
  };
  const toggleRestIntervals = async (toggle: boolean) => {
    actions.toggleRestIntervals(toggle, dispatch);
  };
  const takeSnapshop = (snapshot: []) =>
    actions.takeSnapshop(snapshot, dispatch);

  const setWorkout = (workout: []) => actions.setWorkout(workout, dispatch);
  const setTimerTitle = (index: number, title: string) =>
    actions.setTimerTitle(index, title, dispatch);
  const showCredits = () => actions.showCredits(dispatch);
  const showHelp = () => actions.showHelp(dispatch);
  const showShareModal = () => {
    return actions.showShareModal(dispatch);
  };

  const setWorkoutShortUrl = async (url: string) =>
    actions.setWorkoutShortUrl(url, dispatch);

  const host =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");

  const writeShortUrlToFirebase = async (id: string) => {
    const workOutContent = `{"workout":${encodeURI(
      JSON.stringify(state.timers)
    )},"restIntervalsToggle":${state.restIntervalsToggle}}`;

    await db.ref("workouts/" + id).set(workOutContent);
  };

  const audioCompleted = new Audio(finishLineAudio);
  const audioTick = new Audio(tickAudio);
  const audioPartialFininsh = new Audio(partialFininshAudio);
  const theRunningTimer = state.timers.findIndex((e: any) => e.time > 0);
  const theactiveTimer = state.timers.findIndex((e: any) => e.isActive);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const workoutUrlPortion = urlParams.getAll("workout")[0];
  const restIntervalsTogglePortion = urlParams.get("restIntervalsToggle");

  useEffect(() => {
    // If there are query params in the url, use them unless the state hasn't been set
    if (queryString && urlParams) {
      if (workoutUrlPortion.length && state.timers === initialState.timers) {
        try {
          db.ref("workouts/" + workoutUrlPortion)
            .once("value")
            .then((snapshot) => {
              const parsedValue = JSON.parse(decodeURI(snapshot.val()));
              const workout =
                parsedValue && parsedValue.workout
                  ? parsedValue.workout
                  : initialState.timers;
              const restIntervals =
                parsedValue && parsedValue.restIntervalsToggle
                  ? parsedValue.restIntervalsToggle
                  : false;
              setWorkout(workout);
              toggleRestIntervals(JSON.parse(restIntervals));
            });
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (state.isRunning) {
      // if there is a timmer with > 0, start time there
      if (theRunningTimer > -1 && state.timers[theRunningTimer].time > 0) {
        setTimeout(() => {
          if (
            state.timers[theRunningTimer].time < 5 &&
            state.timers[theRunningTimer].time > 1
          ) {
            audioTick.play();
          }
          if (
            state.timers[theRunningTimer].time < 2 &&
            state.timers[theRunningTimer] !==
              state.timers[state.timers.length - 1]
          ) {
            audioPartialFininsh.play();
          }
          setTime(theRunningTimer, state.timers[theRunningTimer].time - 1);
        }, 1000);
      } else if (theRunningTimer < 0) {
        endTime();
        audioCompleted.play();
      }
    }
  }, [
    audioCompleted,
    audioPartialFininsh,
    audioTick,
    queryString,
    restIntervalsTogglePortion,
    state.isRunning,
    state.timers,
    state.timesUp,
    theRunningTimer,
    theactiveTimer,
    urlParams,
    workoutUrlPortion,
  ]);

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
          {state.timers.length > 1 && (
            <ToggleSwitch
              id="intervalsSwitch"
              cssClass={state.restIntervalsToggle ? "isActive" : ""}
              callback={async () => {
                if (!state.restIntervalsToggle) {
                  await addRestIntervals(DEFAULT_REST_INTERVAL);
                } else {
                  await removeRestIntervals();
                }
              }}
            >
              Add rest intervals
            </ToggleSwitch>
          )}

          {state.snapshot.length > 0 && !state.isRunning && (
            <Button
              cssClass=""
              callBack={async () => {
                resetTime();
              }}
            >
              <i className="fas fa-sync-alt"></i> Reset timers
            </Button>
          )}
          {state.isRunning && (
            <Button
              cssClass="primary"
              callBack={() => {
                pauseTime();
              }}
            >
              <i className="fas fa-pause"></i> Pause
            </Button>
          )}

          {!state.isRunning && !state.timesUp && (
            <Button
              cssClass="primary"
              callBack={async () => {
                startTime();
                if (!state.snapshot.length) {
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
                  reduceTime={reduceTime}
                  {...e}
                  index={i}
                  deleteTimer={deleteTimer}
                  isRunning={state.isRunning}
                  setTimerTitle={setTimerTitle}
                  restIntervalsToggle={state.restIntervalsToggle}
                />
              ))}
          </div>
          {state.timesUp && (
            <div className="box__timeUp">
              {state.placeholder.map((e: any, i: any) => (
                <Timer key={i} isPlaceholder={true} {...e} index={i} />
              ))}
            </div>
          )}
          <div className="box__actions">
            {!state.isRunning && !state.timesUp && (
              <Button
                cssClass="secondary"
                callBack={() => addNewTimer(DEFAULT_NEW_TIME_OBJECT)}
              >
                <i className="fas fa-plus"></i> Add a timer
              </Button>
            )}

            {!state.isRunning && state.timesUp && (
              <>
                {state.snapshot.length > 0 && (
                  <Button
                    cssClass=""
                    callBack={async () => {
                      resetTime();
                    }}
                  >
                    <i className="fas fa-sync-alt"></i> Reset timers
                  </Button>
                )}
                {!state.isRunning && state.timesUp && (
                  <Button
                    cssClass="primary"
                    callBack={async () => {
                      await resetTime();
                      startTime();
                      if (!state.snapshot.length) {
                        takeSnapshop(state.timers);
                      }
                    }}
                  >
                    <i className="fas fa-play"></i> Go again
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="BottomToolbar">
          {state.timers.length && (
            <Button
              cssClass="link"
              callBack={async () => {
                const workoutId = generateUniqueId();
                await writeShortUrlToFirebase(workoutId);
                await setWorkoutShortUrl(`${host}?workout=${workoutId}`);

                showShareModal();
              }}
            >
              <i className="fas fa-share"></i> Share this workout
            </Button>
          )}
          <Button cssClass="link" callBack={() => showHelp()}>
            <i className="fas fa-question-circle"></i> How does this work?
          </Button>
        </div>
      </main>
      <Footer>
        Made with{" "}
        <span role="img" aria-label="time emoji">
          ⏰{" "}
        </span>{" "}
        by{" "}
        <a href="https://thisjuanpernia.com" title="Juan's personal website">
          this Juan
        </a>
        . //{" "}
        <a
          href="https://github.com/juanrules/workoutteim/releases"
          title="Repository releases"
        >
          v{version}
        </a>
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

      {state.showShareModal && (
        <Modal
          isActive={state.showShareModal}
          toggleModal={showShareModal}
          title="Share this workout 💪"
        >
          <p>Use the link below to share this workout with your friends:</p>
          <p>
            (pts... you can also save the link for next time if you want to
            repeat the workout)
          </p>
          <CopiableBox content={state.workoutShortUrl} />
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
