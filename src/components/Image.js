import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Image extends React.Component {
  state = {
    active: false
  };

  setActive = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }));
    this.props.onClick();
  };

  render() {
    const className = classNames("card", {
      "is-selected": this.state.active
    });

    return (
      <div className={className} onClick={this.setActive}>
        <div className="card-image">
          <img className="image in-column" src={this.props.src} alt="album" />
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Image;
