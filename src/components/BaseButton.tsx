import React from "react";
import classNames from "classnames";

interface Props {
  text: string;
  size?: string;
  type?: string;
  fullWidth?: boolean;
  outlined?: boolean;
  inverted?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

const BaseButton: React.FC<Props> = (props: Props) => {
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
    <button disabled={disabled} className={computedClass} onClick={onClick}>
      {text}
    </button>
  );
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
