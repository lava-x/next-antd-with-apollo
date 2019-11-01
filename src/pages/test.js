import React from 'react';
import { withTranslation } from 'i18next';

const TestFunctionalComponent = ({ t }) => (
  <div className="hello full-height-min flex-vertical-center">
    <p>{t('test:hello')}</p>
    <div className="field">
      <div className="control is-large is-loading">
        <input
          className="input is-large"
          type="text"
          placeholder={t('test:input.placeholder')}
        />
      </div>
    </div>
  </div>
);

TestFunctionalComponent.getInitialProps = async () => ({
  namespacesRequired: ['test', 'common'],
});

export default withTranslation('test')(TestFunctionalComponent);
