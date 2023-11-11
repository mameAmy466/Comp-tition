const path = require("path");

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "fr",
    locales: ["en", "fr", "ar"],
    localePath: path.resolve("./public/locales"),
  },
};
