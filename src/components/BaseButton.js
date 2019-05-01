import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const BaseButton = props => {
  const {
    size,
    type,
    fullWidth,
    outlined,
    disabled,
    inverted,
    rounded,
    loading,
    text,
    onClick
  } = props;
  const computedClass = classNames("button", {
    [`is-${size}`]: size,
    [`is-${type}`]: type,
    "is-fullwidth": fullWidth,
    "is-outlined": outlined,
    "is-inverted": inverted,
    "is-rounded": rounded,
    "is-loading": loading
  });
  return (
    <button
      type="button"
      disabled={disabled}
      className={computedClass}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

BaseButton.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  rounded: PropTypes.bool,
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

BaseButton.defaultProps = {
  size: "",
  type: "",
  fullWidth: false,
  outlined: false,
  inverted: false,
  rounded: false,
  disabled: false,
  loading: false
};

export default BaseButton;
