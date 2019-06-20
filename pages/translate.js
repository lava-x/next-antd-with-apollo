import React from 'react';
import Link from 'next/link';
import { Trans } from 'react-i18next';
import { withI18next } from 'config/with-i18next';
import i18n from 'config/i18n';
import { withRouter } from 'next/router';
import { languages } from 'locales';

const Test = ({ t, router }) => (
  <div className="full-height-min pl20 pl20">
    <div className="buttons has-addons">
      {languages.map((lang, index) => {
        return (
          <Link key={index} href={`${router.pathname}?lng=${lang}`}>
            <a className="button" onClick={() => i18n.changeLanguage(lang)}>
              {lang}
            </a>
          </Link>
        );
      })}
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

export default withRouter(withI18next(['translate', 'common'])(Test));
