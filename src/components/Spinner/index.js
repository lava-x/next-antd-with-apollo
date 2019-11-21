import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Spin } from "antd";

import styles from "./styles";

class Spinner extends PureComponent {
  // =================== VIEW
  render() {
    const { size, spinning, tip, fullscreen, className } = this.props;
    const newProps = { size, spinning, tip };
    return (
      <div
        className={classnames(
          "spinner-wrapper",
          { fullscreen },
          className || {}
        )}
      >
        <Spin {...newProps}>{this.props.children}</Spin>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "default", "large"]),
  spinning: PropTypes.bool,
  tip: PropTypes.string,
  fullscreen: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

Spinner.defaultProps = {
  size: "default",
  fullscreen: true,
  spinning: true
};

export default Spinner;
