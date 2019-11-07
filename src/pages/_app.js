import App from "next/app";
import Head from "next/head";
import React from "react";
import { Modal } from "antd";
import NProgress from "nprogress";
import Router from "next/router";
import { flowRight as compose } from "lodash";
import Layout from "components/Layout";
import withAuthSync from "config/withAuthSync";
import withApolloClient from "config/withApolloClient";
import { appWithTranslation } from "i18next";
import "styles/styles.less";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  onActionSignOut = () => {
    // eslint-disable-next-line
    const _this = this;
    Modal.confirm({
      title: "Are you want to signout?",
      icon: "logout",
      centered: true,
      okButtonProps: {
        shape: "round",
        type: "primary"
      },
      cancelButtonProps: {
        shape: "round"
      },
      onOk() {
        window.localStorage.setItem("signout", Date.now());
        if (_this.props.signOutAuthUser) {
          _this.props.signOutAuthUser();
        }
      }
    });
  };

  onActionSignIn = (user, token, callback) => {
    window.localStorage.setItem(
      "signin",
      JSON.stringify({
        token,
        user
      })
    );
    if (this.props.signInAuthUser) {
      this.props.signInAuthUser(user, token, callback);
    }
  };

  render() {
    const { Component, pageProps, authUser } = this.props;
    return (
      <>
        <Head>
          <title>Lava X | NextJS with AntDesign Starter</title>
        </Head>
        <Layout authUser={authUser}>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default compose(
  withApolloClient,
  withAuthSync,
  appWithTranslation
)(MyApp);
