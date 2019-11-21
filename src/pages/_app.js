import App from "next/app";
import Head from "next/head";
import React from "react";
import { Modal } from "antd";
import { flowRight as compose } from "lodash";
import Layout from "components/Layout";
import withAuthSync from "config/withAuthSync";
import withApolloClient from "config/withApolloClient";
import { appWithTranslation } from "i18next";
import "styles/styles.less";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  onActionSignOut = () => {
    // eslint-disable-next-line no-underscore-dangle
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

  render() {
    const { Component, pageProps, authUser, router, config } = this.props;
    return (
      <>
        <Head>
          <title>Lava X | Admin Panel</title>
        </Head>
        <Layout
          config={config}
          router={router}
          authUser={authUser}
          onActionSignOut={this.onActionSignOut}
        >
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
