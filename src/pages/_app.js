import App from "next/app";
import Head from "next/head";
import React from "react";
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
