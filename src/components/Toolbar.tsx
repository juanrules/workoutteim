import React, { ReactElement } from "react";
import "./Toolbar.scss";

interface iToolbar {
  cssClass?: string;
  children: any;
}

const Timer = ({ cssClass, children }: iToolbar): ReactElement => {
  return <div className={`Toolbar`}>{children}</div>;
};

export default Timer;
