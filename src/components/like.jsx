import React from "react";

const Like = ({ onClick, isLike }) => {
  return (
    <React.Fragment>
      <i
        onClick={onClick}
        className={isLike ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
      ></i>
    </React.Fragment>
  );
};

export default Like;
