// @ts-check
/**
 * @type {import('next-i18next').UserConfig}
 */

module.exports = {
  i18n: {
    locales: ["default", "he", "en"],
    defaultLocale: "default",
    localeDetection: false,
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
};
