import React from "react";
const Like = props => {
  //We made stateless functional because state was not used in the fuction and this keyword can only be used in class
  let classes = "";
  if (props.liked) classes = "fa fa-heart";
  else classes = "fa fa-heart-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
};
export default Like;
