import React, { Component } from "react";
import SignInScreen from "screens/SignIn";

class Index extends Component {
  render() {
    return <SignInScreen {...this.props} />;
  }
}

export default Index;
