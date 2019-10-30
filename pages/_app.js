import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { I18nextProvider } from 'react-i18next';
import Layout from 'components/Layout';
import withApolloClient from 'config/withApolloClient';
import initialI18nInstance from 'config/i18n';
import 'styles/styles.less';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <I18nextProvider i18n={initialI18nInstance}>
        <Head>
          <title>Lava X | NextJS with AntDesign Starter</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nextProvider>
    );
  }
}

export default withApolloClient(MyApp);
