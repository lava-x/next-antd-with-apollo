import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "next/router";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import RouteIndicator from "components/RouteIndicator";

class Layout extends Component {
  constructor(props) {
    super(props);

    /* eslint-disable react/no-unused-state */
    this.state = {
      width: 0,
      height: 0,
      mode: "desktop"
    };
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      mode: window.innerWidth > 1087 ? "desktop" : "mobile"
    });
    /* eslint-disable react/no-unused-state */
  };

  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener("resize", _.throttle(this.updateDimensions, 500));
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  render() {
    const { width, height, mode } = this.state;
    const { children, ...restProps } = this.props;
    const props = {
      width,
      height,
      mode,
      ...restProps
    };
    const childrenWithProps = React.Children.map(children, child => {
      if (!child || typeof child === "boolean") {
        return null;
      }
      return React.cloneElement(child, props);
    });

    return (
      <>
        <Header {...props} />
        {childrenWithProps}
        <RouteIndicator />
        <Footer {...props} />
      </>
    );
  }
}

export default withRouter(Layout);
