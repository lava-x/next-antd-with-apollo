import React, { PureComponent } from "react";

import ComposedSignIn from "containers/SignIn";
import styles from "./styles";

class SignInScreen extends PureComponent {
  render() {
    return (
      <div className="sign-in-screen full-height-min flex-vertical-center">
        <div className="overlay" />
        <div className="bring-to-front">
          <ComposedSignIn />
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SignInScreen;
