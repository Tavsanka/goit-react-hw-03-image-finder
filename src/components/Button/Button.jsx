import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ onClick }) => (
  <div className={"button-container"}>
    <button type="button" className={"button"} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
