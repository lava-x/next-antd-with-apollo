import React from "react";

import { withTranslation } from "i18next";
import { withRouter } from "next/router";
import ErrorScreen from "screens/Error";

// learn more
// https://nextjs.org/docs#custom-error-handling
const Page = props => <ErrorScreen {...props} />;

Page.getInitialProps = async ({ res, err }) => {
  const errorCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errorCode;
  return {
    statusCode,
    namespacesRequired: ["error", "common"],
    pageProps: {
      statusCode
    }
  };
};

export default withRouter(withTranslation("error")(Page));
