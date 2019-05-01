import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const BaseInput = props => {
  const {
    label,
    name,
    type,
    size,
    disabled,
    readOnly,
    errorText,
    onChange,
    value,
    placeholder,
    onBlur
  } = props;
  const computedClass = classNames("input", {
    [`is-${size}`]: size,
    "is-danger": errorText
  });

  return (
    <div className="field">
      {label && <div className="label">{label}</div>}
      <div className="control">
        <input
          name={name}
          readOnly={readOnly}
          disabled={disabled}
          className={computedClass}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      </div>
      {props.errorText && <p className="help is-danger">{errorText}</p>}
    </div>
  );
};
BaseInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func.isRequired
};

BaseInput.defaultProps = {
  readOnly: false,
  disabled: false,
  label: "",
  size: "",
  placeholder: ""
};

export default BaseInput;
