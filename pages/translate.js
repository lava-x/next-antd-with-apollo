import React from 'react';
import { i18n, Link, withTranslation, Trans } from 'i18next';

// this will load the 'translate.json' from
// /static/locales/[lang]/translate.json
// where [lang] could be 'en', 'de', and so on.
const defaultI18nNamespaceForThisPage = 'translate';

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
    <h1>{t('translate:welcome')}</h1>
    <p>{t('common:integrates_react-i18next')}</p>
    <p>{t('translate:sample_test')}</p>

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
      <a>{t('translate:link.gotoHome')}</a>
    </Link>
    <br />
    <Link href="/todo">
      <a>{t('translate:link.gotoTodo')}</a>
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

//
// if defaultI18nNamespaceForThisPage is set here
// it means we are able to access language file using shorthand like below:
//
// t('link.gotoTest') instead of the following
// t('translate:link.gotoTest')
//
// and it will still works
//
export default withTranslation(defaultI18nNamespaceForThisPage)(Test);
