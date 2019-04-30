import React from "react";
import classNames from "classnames";
import { FormikErrors } from "formik";

interface Props {
  label?: string;
  name: string;
  type: string;
  size?: string;
  disabled?: boolean;
  readOnly?: boolean;
  errorText: string | FormikErrors<any> | undefined;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const BaseInput: React.FC<Props> = (props: Props) => {
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

BaseInput.defaultProps = {
  readOnly: false,
  disabled: false,
  label: "",
  size: "",
  placeholder: ""
};

export default BaseInput;
