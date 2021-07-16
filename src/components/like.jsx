import React, { Component } from "react";

const Like = (props) => {
  return (
    <React.Fragment>
      <i
        onClick={props.onClick}
        className={props.isLike ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
      ></i>
    </React.Fragment>
  );
};

export default Like;
