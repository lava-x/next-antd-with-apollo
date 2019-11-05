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
    const { children } = this.props;
    return (
      <>
        <Header />
        {children}
        <RouteIndicator />
        <Footer />
      </>
    );
  }
}

export default withRouter(Layout);
