import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { flowRight as compose } from 'lodash';
import Layout from 'components/Layout';
import withApolloClient from 'config/withApolloClient';
import { appWithTranslation } from 'i18next';
import 'styles/styles.less';

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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Lava X | NextJS with AntDesign Starter</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default compose(
  appWithTranslation,
  withApolloClient
)(MyApp);
