import React, { Component } from 'react';
import HomeScreen from 'screens/Home';

import { withTranslation } from 'i18next';

class Index extends Component {
  render() {
    return <HomeScreen />;
  }
}

export default withTranslation('common')(Index);
