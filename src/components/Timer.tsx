import React, { ReactElement, useRef, useEffect } from "react";
import "./Timer.scss";
import Button from "./Button";
import { calculateMins, calculateSeconds } from "../utilities/time";
import { scrollToElement } from "../utilities/ScrollToUtilities";

type iTimer = {
  index: number;
  cssClass?: string;
  title: string;
  time: number;
  isActive: boolean;
  increaseTime: any;
  reduceTime: any;
  stopTimer: any;
  deleteTimer: any;
  setTimerTitle: any;
  isRunning: boolean;
  isPlaceholder: boolean;
  isRestInvertal?: boolean;
  restIntervalsToggle?: boolean;
};

const Timer = ({
  index,
  title,
  time,
  isActive,
  reduceTime,
  increaseTime,
  deleteTimer,
  setTimerTitle,
  isRunning,
  isPlaceholder,
  isRestInvertal,
  restIntervalsToggle,
}: iTimer): ReactElement => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (isActive && isRunning) {
      scrollToElement(elementRef);
    }
  }, [isActive, isRunning]);

  return (
    <div
      className={`Timer  ${isActive && isRunning ? "isActive" : ""} ${
        !time ? "isInactive" : ""
      } ${isRestInvertal ? "isRestInvertal" : ""}`}
      ref={elementRef}
    >
      <div className="Timer__body">
        <span className="Timer__time">
          {calculateMins(time)}:{calculateSeconds(time)}
        </span>

        {!isRunning && !isPlaceholder && (
          <span className="Timer__controls">
            <i
              className="fas fa-sort-up"
              onClick={() => increaseTime(index)}
            ></i>
            <i
              className="fas fa-sort-down"
              onClick={() => reduceTime(index)}
            ></i>
          </span>
        )}
        <span className="Timer__title">
          <input
            type="text"
            placeholder={`Exercise ${!restIntervalsToggle ? index + 1 : ""}`}
            value={title}
            onChange={(e) => setTimerTitle(index, e.target.value)}
            disabled={isRunning || isRestInvertal}
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
