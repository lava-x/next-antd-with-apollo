import React, { Component } from 'react';
import HomeScreen from 'screens/Home';

import { withTranslation } from 'i18next';

class Index extends Component {
  getInitialProps = () => ({
    namespacesRequired: ['common'],
  });

  render() {
    return <HomeScreen />;
  }
}

export default withTranslation('common')(Index);
