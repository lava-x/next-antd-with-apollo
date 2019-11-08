import React from "react";
import _ from "lodash";
import { setCookie, destroyCookie } from "nookies";
import checkLoggedIn from "config/checkLoggedIn";
import redirect from "config/redirect";
import { SIGN_IN_PATH } from "config/constant";
import initialPropsAuth from "config/initialPropsAuth";

const tokenValidityInDays = 30; // 30 days
const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

export default WrappedComponent =>
  class extends React.Component {
    // eslint-disable-next-line
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(props) {
      const { Component, ctx } = props;
      // eslint-disable-next-line
      console.log("getInitialProps ---->", props);
      let pageProps = {};
      const { authUser } = await checkLoggedIn(props.apolloClient);
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({
          ctx,
          authUser,
          apolloClient: props.apolloClient
        });
      }
      const config = initialPropsAuth(ctx, authUser);
      return { ...pageProps, config, authUser };
    }

    // New: We bind our methods
    constructor(props) {
      super(props);
      this.syncAuth = this.syncAuth.bind(this);
      this.state = {
        authUser: props.authUser
      };
    }

    // ======================= LIFECYCLE
    // New: Add event listener when a restricted Page Component mounts
    componentDidMount() {
      this.subscribedStrorageEventListener();
    }

    // New: Remove event listener when the Component unmount and delete all data
    componentWillUnmount() {
      this.unSubscribedStrorageEventListener();
    }

    // ======================= LISTENER
    subscribedStrorageEventListener = () => {
      window.addEventListener("storage", this.syncAuth);
    };

    unSubscribedStrorageEventListener = () => {
      window.removeEventListener("storage", this.syncAuth);
    };

    // ======================= EVENTS
    // sign in auth user
    signIn = (user, token, callback) => {
      const { apolloClient } = this.props;
      const hasToken = !!token;
      if (hasToken) {
        this.setToken(token);
      }
      apolloClient.resetStore().then(() => {
        this.setUser(user, () => {
          // do the following upon successfully setting the state
          if (callback) {
            callback();
          } else {
            redirect({}, "/");
          }
          return null;
        });
      });
    };

    // sign out auth user
    signOut = callback => {
      const { apolloClient, router } = this.props;
      destroyCookie({}, "token");
      this.eraseCookieFromAllPaths("token");
      apolloClient.clearStore().then(() => {
        apolloClient.resetStore();
        const isAtRestrictPath = !_.includes("/", router.pathname);
        if (callback) {
          callback(isAtRestrictPath);
        } else {
          redirect({}, SIGN_IN_PATH, "force-reload");
        }
        this.setUser(null);
      });
    };

    // ======================= HELPER
    eraseCookieFromAllPaths = name => {
      // This function will attempt to remove a cookie from all paths.
      // eslint-disable-next-line
      const pathBits = location.pathname.split("/");
      let pathCurrent = " path=";
      // do a simple pathless delete first.
      document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
      // eslint-disable-next-line
      for (let i = 0; i < pathBits.length; i++) {
        pathCurrent +=
          (pathCurrent.substr(-1) !== "/" ? "/" : "") + pathBits[i];
        document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;${pathCurrent};`;
      }
    };

    // Set token into cookies
    setToken = token => {
      setCookie({}, "token", token, {
        maxAge: tokenValidityInDays * 24 * 60 * 60,
        path: "/"
      });
    };

    // Set auth user and reflect to application
    setUser = (authUser, callback) => {
      this.setState({ authUser }, callback);
    };

    syncAuth(event) {
      if (event.key === "signout") {
        this.signOut();
      }
      if (event.key === "signin") {
        const payload = window.localStorage.getItem("signin");
        if (payload) {
          const parsedPayload = JSON.parse(payload);
          this.signIn(parsedPayload.user, parsedPayload.token);
        }
      }
    }

    // ======================= VIEW
    render() {
      const { authUser } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          authUser={authUser}
          signOutAuthUser={this.signOut}
          signInAuthUser={this.signIn}
        />
      );
    }
  };
