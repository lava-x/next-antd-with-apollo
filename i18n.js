const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["de"],
  localePath:
    typeof window === "undefined" ? "public/static/locales" : "static/locales"
});

module.exports = NextI18NextInstance;
