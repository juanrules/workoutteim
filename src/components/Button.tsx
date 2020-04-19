import React, { ReactElement } from "react";
import "./Button.scss";

interface iButton {
  cssClass?: string;
  children: any;
  callBack?: any;
}

const Timer = ({ cssClass, children, callBack }: iButton): ReactElement => {
  return (
    <button
      className={`Button ${cssClass}`}
      onClick={() => callBack()}
      aria-label="start timer"
    >
      {children}
    </button>
  );
};

export default Timer;
