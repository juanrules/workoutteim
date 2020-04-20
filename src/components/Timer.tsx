import React, { ReactElement, useEffect, useState } from "react";
import "./Timer.scss";
import Button from "./Button";
import { calculateMins, calculateSeconds } from "../utilities/time";
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
  setTimerTitle: any;
  isRunning: boolean;
  isPlaceholder: boolean;
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
  setTimerTitle,
  isRunning,
  isPlaceholder,
}: iTimer): ReactElement => {
  const [counter, setCounter] = useState(time);

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
  }, [isActive, counter, startTimer, index, time, setTime]);

  return (
    <div
      className={`Timer ${cssClass} ${isActive ? "isActive" : ""} ${
        !counter ? "isInactive" : ""
      } `}
    >
      <div className="Timer__body">
        <span className="Timer__time">
          {calculateMins(counter)}:{calculateSeconds(counter)}
        </span>

        {!isRunning && !isPlaceholder && (
          <span className="Timer__controls">
            <i
              className="fas fa-sort-up"
              onClick={() => {
                increaseTime(index);
                setCounter(counter + constants.TIME_INCREMENT);
              }}
            ></i>
            <i
              className="fas fa-sort-down"
              onClick={() => {
                reduceTime(index);
                setCounter(
                  counter - constants.TIME_INCREMENT < 0
                    ? 1
                    : counter - constants.TIME_INCREMENT
                );
              }}
            ></i>
          </span>
        )}
        <span className="Timer__title">
          <input
            type="text"
            placeholder={`Exercise ${index + 1}`}
            value={title || `Exercise ${index + 1}`}
            onChange={(e) => setTimerTitle(index, e.target.value)}
            disabled={isRunning}
          />
        </span>
      </div>

      <div className="Timer__actions">
        {!isRunning && !isPlaceholder && (
          <Button cssClass="Timer__remove" callBack={() => deleteTimer(index)}>
            <i className="far fa-trash-alt" aria-label="Remove timer"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
