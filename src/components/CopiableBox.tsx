import React, { ReactElement } from "react";
import "./CopiableBox.scss";

interface iCopiableBox {
  content: string;
}

const CopiableBox = ({ content }: iCopiableBox): ReactElement => {
  const url = `${
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "")
  }?workout=${content}`;

  return (
    <div className="CopiableBox">
      <input
        type="text"
        value={url}
        autoFocus
        readOnly
        onFocus={(event) => event.target.select()}
      />
    </div>
  );
};

export default CopiableBox;
