import React, { ReactElement } from "react";
import "./CopiableBox.scss";

interface iCopiableBox {
  content: string;
}

const CopiableBox = ({ content }: iCopiableBox): ReactElement => {
  return (
    <div className="CopiableBox">
      <input
        type="text"
        value={content}
        autoFocus
        readOnly
        onFocus={(event) => event.target.select()}
      />
    </div>
  );
};

export default CopiableBox;
