import React from 'react';
import { i18n, Link, withTranslation, Trans } from 'i18n';
import { withRouter } from 'next/router';

const Test = ({ t, router }) => (
  <div className="full-height-min pl20 pl20">
    <div className="buttons has-addons">
      <button
        type="button"
        onClick={() =>
          i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')
        }
      >
        {t('change-locale')}
      </button>
    </div>
    <h1>{t('welcome')}</h1>
    <p>{t('common:integrates_react-i18next')}</p>
    <p>{t('sample_test')}</p>

    <div>
      <button>{t('translate:sample_button')}</button>
    </div>
    <p>{t('common:pureComponent')}</p>
    <p>{t('common:extendedComponent')}</p>
    <Trans i18nKey="common:transComponent">
      Alternatively, you can use <code>Trans</code> component.
    </Trans>
    <br />
    <Link href="/">
      <a>{t('link.gotoHome')}</a>
    </Link>
    <br />
    <Link href="/todo">
      <a>{t('link.gotoTodo')}</a>
    </Link>
    <br />
    <Link href="/test">
      <a>{t('link.gotoTest')}</a>
    </Link>
  </div>
);

Test.getInitialProps = async () => ({
  namespacesRequired: ['translate', 'common'],
});

export default withRouter(withTranslation('translate-page')(Test));
