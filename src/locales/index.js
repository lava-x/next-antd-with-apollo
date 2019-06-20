const locales = {};
const langs = [];
const req = require.context('.', true, /\.json$/);
req.keys().forEach((key) => {
  // extract language name e.g: en, de, cn, bm
  const lang = key.replace(/\.\/(.+)\/.+$/, '$1');
  // the file name of the json, e.g: extracted 'home.json' from './en/home.json'
  const fileName = key.replace(/^.*(\\|\/|\|json|:)/, '');
  // take the file name as key, extracted 'home' from 'home.json'
  const keyName = fileName.split('.')[0];
  // check if lang is empty, if empty then create a lang object
  if (!locales[lang]) {
    locales[lang] = {};
    langs.push(lang);
  }
  // assign key for specified lang
  locales[lang][keyName] = req(key);
});

export const languages = langs;

export default locales;
