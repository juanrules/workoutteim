import React, { ReactElement } from "react";
import "./Menu.scss";

type iMenu = {
  isMenuActive: boolean;
  children: any;
};

const Menu = ({ isMenuActive, children }: iMenu): ReactElement => {
  return (
    <nav className={`Menu ${isMenuActive ? "is-active" : ""}`}>{children}</nav>
  );
};

export default Menu;
