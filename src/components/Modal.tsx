import React, { ReactElement } from "react";
import "./Modal.scss";

type iModal = {
  toggleModal: any;
  isActive: boolean;
  children: any;
  title?: string;
};

const Modal = ({
  isActive,
  toggleModal,
  children,
  title,
}: iModal): ReactElement => {
  return (
    <>
      <div className={`Modal ${isActive ? "is-active" : ""}`}>
        <h3 className="Modal__title">{title}</h3>
        {children}
      </div>
      <div className="Modal__backDrop" onClick={() => toggleModal()}></div>
    </>
  );
};

export default Modal;
