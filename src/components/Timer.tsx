import React, { ReactElement, useEffect, useState } from "react";
import "./Timer.scss";
import Button from "./Button";
import { addZero } from "../utilities/time";
import * as constants from "../constants/main";

type iTimer = {
  index: number;
  cssClass?: string;
  title: string;
  time: number;
  isActive: boolean;
  startTimer: any;
  increaseTime: any;
  reduceTime: any;
  stopTimer: any;
  deleteTimer: any;
  setTime: any;
  isRunning: boolean;
};

const Timer = ({
  index,
  title,
  time,
  isActive,
  startTimer,
  cssClass,
  reduceTime,
  increaseTime,
  deleteTimer,
  setTime,
  isRunning,
}: iTimer): ReactElement => {
  const calculateMins = (time: number) =>
    addZero(Math.floor((time % 3600) / 60));
  const [counter, setCounter] = useState(time);

  const calculateSeconds = (time: number) => addZero(time % 60);

  const minutes = calculateMins(counter);
  const seconds = calculateSeconds(counter);

  useEffect(() => {
    if (isActive) {
      if (counter > 0) {
        setTimeout(() => {
          setCounter(counter - 1);
        }, 1000);
      } else {
        startTimer(index + 1);
      }
    }
  }, [isActive, time, index, startTimer, setTime, counter]);

  return (
    <div
      className={`Timer ${cssClass} ${isActive ? "is-active" : ""} ${
        !time ? "is-inactive" : ""
      }`}
    >
      <div className="Timer__body">
        <span className="Timer__time">
          {minutes}:{seconds}
        </span>

        {!isRunning && time !== 0 && (
          <span className="Timer__controls">
            <i
              className="fas fa-sort-up"
              onClick={async () => {
                await increaseTime(index);
                setCounter(counter + constants.TIME_INCREMENT);
              }}
            ></i>
            <i
              className="fas fa-sort-down"
              onClick={async () => {
                await reduceTime(index);
                setCounter(
                  counter - constants.TIME_INCREMENT < 0
                    ? 0
                    : counter - constants.TIME_INCREMENT
                );
              }}
            ></i>
          </span>
        )}
        <span className="Timer__title">
          {`${title} ${index + 1}`}
          <span className="Timer__edit-action">Click here to edit</span>
        </span>
      </div>

      <div className="Timer__actions">
        {!isRunning && (
          <Button cssClass="Timer__remove" callBack={() => deleteTimer(index)}>
            <i className="far fa-trash-alt"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
