import React from "react";

import "./IconButton.scss";

function IconButton(props) {
  return (
    <button
      className="IconButton"
      disabled={props.isDisabled}
      onClick={props.onClickHandler}
      aria-label={props.label}
      style={{
        WebkitMaskImage: `url("${props.mask}"`,
        maskImage: `url("${props.mask}"`,
      }}
    ></button>
  );
}

export default IconButton;
