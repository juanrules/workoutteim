import React, { ReactElement } from "react";
import "./Footer.scss";

interface iFooter {
  children: any;
}

const Timer = ({ children }: iFooter): ReactElement => {
  return <footer className={`Footer`}>{children}</footer>;
};

export default Timer;
