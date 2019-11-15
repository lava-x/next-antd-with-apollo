import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "next/router";
import Sidebar from "components/Layout/Sidebar";
import RouteIndicator from "components/RouteIndicator";
import Spinner from "components/Spinner";

class Layout extends Component {
  constructor(props) {
    super(props);

    /* eslint-disable react/no-unused-state */
    this.state = {
      width: 0,
      height: 0,
      mode: "desktop",
      loading: true
    };
  }

  updateDimensions = () => {
    this.setState({
      loading: false,
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
    const { width, height, mode, loading } = this.state;
    const { children, ...restProps } = this.props;
    const props = {
      width,
      height,
      mode,
      ...restProps
    };
    if (loading) return <Spinner fullscreen />;
    const childrenWithProps = React.Children.map(children, child => {
      if (!child || typeof child === "boolean") {
        return null;
      }
      return React.cloneElement(child, props);
    });

    return (
      <>
        <Sidebar {...props}>{childrenWithProps}</Sidebar>
        <RouteIndicator />
      </>
    );
  }
}

export default withRouter(Layout);
