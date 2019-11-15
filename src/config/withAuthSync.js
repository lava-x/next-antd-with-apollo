import React from "react";
import _ from "lodash";
import { setCookie, destroyCookie } from "nookies";
import checkLoggedIn from "config/checkLoggedIn";
import redirect from "config/redirect";
import { SIGN_IN_PATH, DEFAULT_PATH_AFTER_SIGN_IN } from "config/constant";
import initialPropsAuth from "config/initialPropsAuth";

const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

const syncAuthEventKeyName = "signout";
const tokenValidityInDays = 30; // 30 days

// ======================= HELPER
const eraseCookieFromAllPaths = name => {
  // This function will attempt to remove a cookie from all paths.
  // eslint-disable-next-line
  const pathBits = location.pathname.split("/");
  let pathCurrent = " path=";
  // do a simple pathless delete first.
  document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
  // eslint-disable-next-line
  for (let i = 0; i < pathBits.length; i++) {
    pathCurrent += (pathCurrent.substr(-1) !== "/" ? "/" : "") + pathBits[i];
    document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;${pathCurrent};`;
  }
};

export const clearAuthToken = () => {
  destroyCookie({}, "token");
  eraseCookieFromAllPaths("token");
  window.localStorage.setItem(syncAuthEventKeyName, Date.now());
};

export const setAuthToken = token => {
  setCookie({}, "token", token, {
    maxAge: tokenValidityInDays * 24 * 60 * 60,
    path: "/"
  });
};

export default WrappedComponent =>
  class extends React.Component {
    // eslint-disable-next-line
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(props) {
      const { Component, ctx, apolloClient } = props;
      // eslint-disable-next-line
      // console.log("getInitialProps ---->", props);
      let pageProps = {};
      const { authUser } = await checkLoggedIn(apolloClient);
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({
          ctx,
          authUser,
          apolloClient
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
      window.localStorage.removeItem(syncAuthEventKeyName);
    }

    // ======================= LISTENER
    subscribedStrorageEventListener = () => {
      window.addEventListener("storage", this.syncAuth);
    };

    unSubscribedStrorageEventListener = () => {
      window.removeEventListener("storage", this.syncAuth);
    };

    // sign out auth user
    signOut = callback => {
      const { apolloClient, router } = this.props;
      clearAuthToken();
      apolloClient.clearStore().then(() => {
        apolloClient.resetStore();
        const isAtRestrictPath = !_.includes(
          DEFAULT_PATH_AFTER_SIGN_IN,
          router.pathname
        );
        if (callback) {
          callback(isAtRestrictPath);
        } else {
          redirect({}, SIGN_IN_PATH, "force-reload");
        }
      });
    };

    // ======================= EVENTS
    syncAuth(event) {
      const { apolloClient } = this.props;
      if (event.key === syncAuthEventKeyName) {
        apolloClient.cache.reset().then(() => {
          clearAuthToken();
          redirect({}, SIGN_IN_PATH, "force-reload");
        });
      }
    }

    // ======================= VIEW
    render() {
      return (
        <WrappedComponent {...this.props} signOutAuthUser={this.signOut} />
      );
    }
  };
