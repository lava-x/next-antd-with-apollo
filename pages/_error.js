import React from 'react';
import Error from 'next/error';

import { withTranslation } from 'i18next';
import { withRouter } from 'next/router';

// learn more
// https://nextjs.org/docs#custom-error-handling
const Page = ({ /* props */ errorCode }) => {
  return <Error statusCode={errorCode} />;
};

Page.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { errorCode: statusCode, namespacesRequired: ['error', 'common'] };
};

export default withRouter(withTranslation('error')(Page));
