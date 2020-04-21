import React, { FunctionComponent } from "react";
import "./ToggleSwitch.scss";

interface iToggleSwitch {
  callback: any;
  children: any;
  id: string;
  cssClass?: string;
}

const ToggleSwitch: FunctionComponent<iToggleSwitch> = ({
  callback,
  children,
  id,
  cssClass,
}) => {
  return (
    <div className={`toggleSwitch ${cssClass}`}>
      <input type="checkbox" id={id} />
      <label
        htmlFor={id}
        onClick={() => callback()}
        title="Remove all the Fecks, Arse, etc."
      >
        {children}
      </label>
    </div>
  );
};

export default ToggleSwitch;
