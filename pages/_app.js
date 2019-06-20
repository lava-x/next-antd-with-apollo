import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import NProgress from 'nprogress';
import Router, { withRouter } from 'next/router';
import { I18nextProvider } from 'react-i18next';
import Layout from 'components/Layout';
import withApolloClient from 'config/with-apollo-client';
import initialI18nInstance from 'config/i18n';
import 'styles/styles.scss';
import 'styles/antd-styles.less';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, ctx, apolloClient } = props;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps, apolloClient };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <title>Lava X | NextJS with AntDesign Starter</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <I18nextProvider i18n={initialI18nInstance}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </I18nextProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withRouter(withApolloClient(MyApp));
